# Knowledge map semantics

`curriculum/MAP.yaml` is a directed competency graph.

It is called a "map" rather than a tree because one competency can depend on several others and branches can reconverge.

Validate it against `schemas/knowledge-map.schema.json` when tooling permits.

## Top-level structure

```yaml
schema_version: 1
map_id: database-systems
title: Database Systems
version: 1
mission_scope: Advanced core relational database systems; intermediate PostgreSQL specialization.
completion_policy:
  required_importance: [core]
  minimum_level: 3
  require_mastery_for:
    - db.capstone
domains: [...]
nodes: [...]
research_notes:
  uncertainties: [...]
  gaps: [...]
```

## Node structure

```yaml
- id: db.indexes.composite
  title: Composite indexes
  domain: indexing
  importance: core
  depth: intermediate

  description: >
    Choose and reason about multi-column indexes for realistic query patterns.

  prerequisites:
    all_of:
      - node: db.indexes.btree
        min_level: 2
      - node: db.sql.filtering
        min_level: 2
    any_of: []

  outcomes:
    - id: choose-order
      statement: Choose column order from equality, range, sorting, and workload requirements.
    - id: predict-use
      statement: Predict whether representative queries can use the index and verify the prediction.

  evidence_modes:
    - explanation
    - canonical_task
    - novel_problem
    - practical_task
    - delayed_retrieval
    - external_assessment

  level_criteria:
    familiar:
      - Explain the purpose of a multi-column index and why order matters.
    functional:
      - Choose a reasonable composite index for common query patterns without hints.
    proficient:
      - Analyze unfamiliar workloads, compare alternatives, and validate with query-plan evidence.

  resource_ids: [R012, R019]
  external_assessment_ids: [A007]

  unlocks:
    - db.indexes.covering
    - db.query-planning.index-selection

  tags: [postgresql, performance]
```

`unlocks` is a convenience/readability field. Prerequisites are authoritative. Validation should warn when declared `unlocks` disagrees with reverse prerequisite edges.

## Prerequisite semantics

A node is `available` when:
- every `all_of` prerequisite is at or above its `min_level`; and
- `any_of` is empty, or at least one `any_of` prerequisite is satisfied.

Most nodes should use `all_of` only.

A missing prerequisite state is level 0.

## Node granularity test

A node is probably too broad when:
- it would require several independent weeks of evidence;
- a learner could be excellent at one half and poor at another;
- different prerequisites apply to different halves;
- the title is a textbook chapter with many distinct outcomes.

A node is probably too narrow when:
- it can only be assessed by trivia;
- it has no meaningful independent transfer;
- splitting it creates dozens of near-identical micro-nodes.

Aim for a competency that can normally move from introduction to functional use in one or a few focused sessions, while proficiency/mastery may accumulate over longer periods.

## Completion semantics

"Core complete" should never mean "all nodes seen".

Use the map's `completion_policy`.

A defensible default:
- every `core` node at least `proficient (3)`;
- designated capstone/integrative nodes at `mastered (4)`;
- no overdue critical retention checks for completion-critical nodes;
- evidence confidence at least `moderate`, with external/independent evidence used where available.

Mission-specific policies may be stricter.

## Visual representation

`curriculum/MAP.md` is generated from the graph.

Recommended visual state:
- locked;
- available;
- learning;
- familiar;
- functional;
- proficient;
- mastered;
- review due.

The visual state is not stored in `MAP.yaml`; it is derived from prerequisites + `PROGRESS.yaml`.
