#!/usr/bin/env python3
"""Validate core Mastery Teach workspace structure.

Uses only Python stdlib plus PyYAML if available.
"""
from __future__ import annotations
from pathlib import Path
import sys

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML is required: pip install pyyaml", file=sys.stderr)
    sys.exit(2)


LEVELS = set(range(5))
CONFIDENCE = {"low", "moderate", "strong"}
RETENTION = {"fresh", "due", "confirmed", "uncertain"}


def load_yaml(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def cycle_check(nodes_by_id):
    graph = {}
    for node_id, node in nodes_by_id.items():
        p = node.get("prerequisites") or {}
        deps = [x["node"] for x in p.get("all_of", [])] + [x["node"] for x in p.get("any_of", [])]
        graph[node_id] = deps

    visiting, done = set(), set()

    def visit(n, chain):
        if n in done:
            return None
        if n in visiting:
            i = chain.index(n) if n in chain else 0
            return chain[i:] + [n]
        visiting.add(n)
        chain.append(n)
        for d in graph.get(n, []):
            c = visit(d, chain)
            if c:
                return c
        chain.pop()
        visiting.remove(n)
        done.add(n)
        return None

    for n in graph:
        c = visit(n, [])
        if c:
            return c
    return None


def validate(root: Path) -> list[str]:
    errors = []
    map_path = root / "curriculum" / "MAP.yaml"
    if not map_path.exists():
        return [f"Missing {map_path}"]

    data = load_yaml(map_path)
    nodes = data.get("nodes") or []
    ids = [n.get("id") for n in nodes]
    if None in ids:
        errors.append("Every map node must have an id.")
    if len(ids) != len(set(ids)):
        errors.append("Duplicate node IDs found.")

    nodes_by_id = {n["id"]: n for n in nodes if n.get("id")}
    outcome_ids = {}
    for node_id, n in nodes_by_id.items():
        outs = [o.get("id") for o in n.get("outcomes", [])]
        if len(outs) != len(set(outs)):
            errors.append(f"{node_id}: duplicate outcome IDs.")
        outcome_ids[node_id] = set(outs)

        p = n.get("prerequisites") or {}
        for kind in ("all_of", "any_of"):
            for item in p.get(kind, []) or []:
                dep = item.get("node")
                level = item.get("min_level")
                if dep not in nodes_by_id:
                    errors.append(f"{node_id}: unknown prerequisite {dep}.")
                if dep == node_id:
                    errors.append(f"{node_id}: self prerequisite.")
                if level not in {1,2,3,4}:
                    errors.append(f"{node_id}: invalid prerequisite min_level {level}.")

        for u in n.get("unlocks", []) or []:
            if u not in nodes_by_id:
                errors.append(f"{node_id}: unknown unlock target {u}.")

    cycle = cycle_check(nodes_by_id)
    if cycle:
        errors.append("Prerequisite cycle: " + " -> ".join(cycle))

    progress_path = root / "PROGRESS.yaml"
    if progress_path.exists():
        p = load_yaml(progress_path)
        if p.get("map_id") != data.get("map_id"):
            errors.append("PROGRESS.yaml map_id does not match MAP.yaml.")
        if p.get("map_version") != data.get("version"):
            errors.append("PROGRESS.yaml map_version does not match MAP.yaml version.")

        pnodes = p.get("nodes") or {}
        for node_id, state in pnodes.items():
            if node_id not in nodes_by_id:
                errors.append(f"Progress references unknown node {node_id}.")
                continue
            if state.get("level") not in LEVELS:
                errors.append(f"{node_id}: invalid progress level.")
            if state.get("confidence") not in CONFIDENCE:
                errors.append(f"{node_id}: invalid confidence.")
            if state.get("retention") not in RETENTION:
                errors.append(f"{node_id}: invalid retention.")
            for oid in (state.get("outcome_state") or {}):
                if oid not in outcome_ids[node_id]:
                    errors.append(f"{node_id}: progress references unknown outcome {oid}.")

        evidence_ids = set()
        for e in p.get("evidence") or []:
            eid = e.get("id")
            if eid in evidence_ids:
                errors.append(f"Duplicate evidence ID {eid}.")
            evidence_ids.add(eid)
            node_id = e.get("node")
            if node_id not in nodes_by_id:
                errors.append(f"Evidence {eid}: unknown node {node_id}.")
                continue
            for oid in e.get("outcome_ids") or []:
                if oid not in outcome_ids[node_id]:
                    errors.append(f"Evidence {eid}: unknown outcome {node_id}/{oid}.")

    return errors


def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    errors = validate(root)
    if errors:
        print("Workspace validation failed:")
        for e in errors:
            print(f"- {e}")
        sys.exit(1)
    print("Workspace validation passed.")


if __name__ == "__main__":
    main()
