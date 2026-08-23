# File map

## Runtime core

- `SKILL.md` — phase router and non-negotiable teaching rules. Kept deliberately smaller than the full design.
- `agents/openai.yaml` — OpenAI agent metadata.

## References loaded only when needed

- `references/MISSION.md` — mission interview and format.
- `references/WORKSPACE.md` — workspace contract and source-of-truth rules.
- `references/CURRICULUM-RESEARCH.md` — initial/rebuild domain research protocol.
- `references/KNOWLEDGE-MAP.md` — graph semantics, node granularity, prerequisites, completion.
- `references/RESOURCES.md` — trust/source policy.
- `references/DIAGNOSTIC.md` — adaptive initial placement.
- `references/MASTERY-MODEL.md` — levels, evidence, confidence, retention.
- `references/ASSESSMENT.md` — generated vs independent vs practical assessments.
- `references/SESSION-PROTOCOL.md` — normal teaching loop.
- `references/LEARNING-RECORDS.md` — sparse decision-grade records.
- `references/LESSONS-AND-REFERENCE.md` — optional durable lessons and reference artifacts.

## Schemas

- `schemas/knowledge-map.schema.json`
- `schemas/progress.schema.json`
- `schemas/assessment-catalog.schema.json`

These formalize the three persistent structured models: domain, learner, assessment inventory.

## Templates

- `templates/MISSION.md`
- `templates/NOTES.md`
- `templates/RESOURCES.md`
- `templates/PROGRESS.yaml`
- `templates/CATALOG.yaml`

## Utilities

- `scripts/validate_workspace.py` — validates IDs, prerequisites, cycles, map/progress consistency, outcomes, and evidence references.
- `scripts/render_map.py` — generates a Mermaid map + progress table at `curriculum/MAP.md`.
- `requirements.txt` — PyYAML dependency for utilities.

## Worked example

`examples/database-systems/` contains a small runnable workspace demonstrating:

- a mission;
- a competency graph with branches/reconvergence;
- prerequisite levels;
- learner evidence/progress;
- external assessment mappings;
- a generated visual map.

The example is intentionally incomplete. It demonstrates the machinery and explicitly must not be mistaken for a researched complete database-systems curriculum.

## Project/meta

- `README.md` — usage and architecture.
- `ATTRIBUTION.md` — relationship to Matt Pocock's `teach` skill.
- `LICENSE` — upstream MIT notice retained.
- `CHANGELOG.md` — skill V1 changes.
