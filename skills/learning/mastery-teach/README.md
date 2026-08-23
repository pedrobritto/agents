# Mastery Teach

A stateful teaching skill built around an explicit competency graph.

The design is inspired by Matt Pocock's `teach` skill: persistent learning workspaces, mission-driven teaching, trusted sources, tight feedback loops, retrieval practice, spacing, interleaving, learning records, and reusable reference material. This version adds a researched curriculum graph, evidence-based proficiency levels, independent assessments, delayed retention checks, and an auditable learner-state model.

## What changes compared with a conventional tutor

A conventional tutor can decide the next topic from recent conversation. Mastery Teach first builds a model of the domain, then maintains a separate model of the learner.

```text
MISSION
  |
  v
CURRICULUM RESEARCH ---> COMPETENCY GRAPH
                              |
                              v
DIAGNOSTIC -----------> LEARNER STATE
                              |
                              v
                    NEXT REACHABLE NODE
                              |
                 +------------+-------------+
                 |                          |
              TEACH                      REVIEW
                 |                          |
                 +------------+-------------+
                              |
                           ASSESS
                              |
                              v
                         NEW EVIDENCE
                              |
                              +----> LEARNER STATE
```

A node means "the learner can demonstrate X", not "the learner has seen topic X".

## Key files created in a learning workspace

```text
MISSION.md
RESOURCES.md
NOTES.md
PROGRESS.yaml

curriculum/
  MAP.yaml
  MAP.md
  SOURCES.md
  CHANGELOG.md

assessments/
  CATALOG.yaml
  attempts/

learning-records/
lessons/
reference/
assets/
```

`curriculum/MAP.yaml` is the domain model. `PROGRESS.yaml` is the learner model. Keep them separate.

## Install locally

The current `skills` CLI supports local paths. From the parent directory containing this skill:

```bash
npx skills@latest add ./mastery-teach
```

You can target a specific supported agent with the CLI's `--agent` option.

## Start a workspace

Create an empty directory for one coherent learning goal, enter it, and invoke the skill in your agent.

Example mission:

> I want an advanced core understanding of relational database systems and intermediate practical depth in PostgreSQL, sufficient to design schemas, reason about transactions and concurrency, diagnose query performance, and justify design decisions.

The skill should establish the mission, research and build the initial map, run a diagnostic, and only then enter normal teaching sessions.

## Validate a workspace

From the skill directory:

```bash
python scripts/validate_workspace.py /path/to/learning-workspace
```

This checks structural errors such as duplicate node IDs, unknown prerequisites, invalid levels, and prerequisite cycles.

## Render the map

```bash
python scripts/render_map.py /path/to/learning-workspace
```

This writes `curriculum/MAP.md`, including a Mermaid graph and progress summary. `MAP.yaml` and `PROGRESS.yaml` remain the sources of truth.

## Design constraints

The skill deliberately avoids a single numerical "knowledge score". A score can be valid when an actual external assessment produces one. The learner model instead uses proficiency level, evidence diversity, confidence, retention state, and mapped outcomes.

"Mastered" is scoped. It means the learner has strong evidence for the explicitly defined competencies in the node, including durable recall/transfer. It never means omniscience about the subject.

See `ATTRIBUTION.md` and `LICENSE`.
