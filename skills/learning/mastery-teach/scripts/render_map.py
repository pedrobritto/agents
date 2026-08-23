#!/usr/bin/env python3
"""Render curriculum/MAP.md from MAP.yaml and optional PROGRESS.yaml."""
from __future__ import annotations
from pathlib import Path
import sys

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML is required: pip install pyyaml", file=sys.stderr)
    sys.exit(2)


LEVEL_NAME = {
    0: "unseen",
    1: "familiar",
    2: "functional",
    3: "proficient",
    4: "mastered",
}


def load(path):
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def prereqs_satisfied(node, states):
    p = node.get("prerequisites") or {}
    all_of = p.get("all_of") or []
    any_of = p.get("any_of") or []

    def sat(req):
        return (states.get(req["node"], {}).get("level", 0) >= req["min_level"])

    return all(sat(r) for r in all_of) and (not any_of or any(sat(r) for r in any_of))


def visual_state(node, states):
    s = states.get(node["id"])
    if s:
        if s.get("retention") in {"due", "uncertain"} and s.get("level", 0) > 0:
            return "review"
        level = s.get("level", 0)
        return LEVEL_NAME[level]
    return "available" if prereqs_satisfied(node, states) else "locked"


def safe_mermaid_id(node_id):
    return "n_" + "".join(c if c.isalnum() else "_" for c in node_id)


def render(root: Path):
    m = load(root / "curriculum" / "MAP.yaml")
    progress_path = root / "PROGRESS.yaml"
    p = load(progress_path) if progress_path.exists() else {"nodes": {}}
    states = p.get("nodes") or {}
    nodes = m["nodes"]
    by_id = {n["id"]: n for n in nodes}

    lines = [
        f"# {m['title']} — learning map",
        "",
        f"Map version: **{m['version']}**.",
        "",
        "```mermaid",
        "flowchart LR",
        "classDef locked fill:#eee,stroke:#999,color:#777;",
        "classDef available fill:#fff,stroke:#333,stroke-width:2px;",
        "classDef unseen fill:#fff,stroke:#777;",
        "classDef familiar fill:#fff,stroke:#555,stroke-width:2px;",
        "classDef functional fill:#fff,stroke:#333,stroke-width:3px;",
        "classDef proficient fill:#fff,stroke:#111,stroke-width:4px;",
        "classDef mastered fill:#fff,stroke:#000,stroke-width:6px;",
        "classDef review fill:#fff,stroke:#000,stroke-width:3px,stroke-dasharray: 5 5;",
    ]

    for n in nodes:
        nid = safe_mermaid_id(n["id"])
        state = visual_state(n, states)
        label = n["title"].replace('"', "'")
        level = states.get(n["id"], {}).get("level")
        suffix = f" [{LEVEL_NAME[level]}]" if level is not None and level > 0 else f" [{state}]"
        lines.append(f'  {nid}["{label}{suffix}"]')
        lines.append(f"  class {nid} {state};")

    for n in nodes:
        pdef = n.get("prerequisites") or {}
        for r in (pdef.get("all_of") or []) + (pdef.get("any_of") or []):
            lines.append(f"  {safe_mermaid_id(r['node'])} --> {safe_mermaid_id(n['id'])}")

    lines += ["```", "", "## Status", ""]
    lines.append("| Competency | Importance | Depth | State | Confidence | Retention |")
    lines.append("|---|---|---|---|---|---|")
    for n in nodes:
        s = states.get(n["id"], {})
        state = visual_state(n, states)
        conf = s.get("confidence", "—")
        retention = s.get("retention", "—")
        lines.append(f"| {n['title']} | {n['importance']} | {n['depth']} | {state} | {conf} | {retention} |")

    available = [n["title"] for n in nodes if visual_state(n, states) == "available"]
    reviews = [n["title"] for n in nodes if visual_state(n, states) == "review"]
    lines += ["", "## Frontier", ""]
    lines.append("**Available:** " + (", ".join(available) if available else "None."))
    lines.append("")
    lines.append("**Review due/uncertain:** " + (", ".join(reviews) if reviews else "None."))

    out = root / "curriculum" / "MAP.md"
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return out


def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    out = render(root)
    print(out)


if __name__ == "__main__":
    main()
