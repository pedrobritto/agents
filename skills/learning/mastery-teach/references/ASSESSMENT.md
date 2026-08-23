# Assessment policy

Assessment has two purposes:

1. improve learning through retrieval and feedback;
2. provide evidence that the learner's competence claim is trustworthy.

Those purposes overlap but are not identical.

## Assessment classes

### Tutor-generated formative

Created by the agent for immediate learning.

Use for:
- rapid feedback;
- targeted practice;
- misconception diagnosis;
- adaptive difficulty.

Provenance: `generated`.

Never present it as independent validation.

### External/independent

Created independently of the current tutoring process.

Examples:
- university exam or problem set;
- official sample certification questions;
- respected textbook exercises;
- standardized question banks;
- canonical labs/benchmarks;
- professional body competency assessments.

Provenance: `external`.

Prefer sources with known authorship/institution, stable version/date, clear scope, and defensible answer keys/rubrics.

### Practical/real-world

A task performed in a realistic environment.

Examples:
- design and benchmark a schema;
- write and review a program;
- interpret an anonymized case or simulation;
- conduct a lab technique under appropriate supervision;
- write an essay judged against a published rubric.

Provenance: `practical`.

## Assessment catalog

Store inventory in `assessments/CATALOG.yaml`.

Example:

```yaml
schema_version: 1
assessments:
  - id: A007
    title: Database course — Indexing problem set
    provenance: external
    source_id: R031
    url: https://example.edu/problem-set
    date_or_version: "2026"
    node_ids:
      - db.indexes.btree
      - db.indexes.composite
    outcome_ids:
      db.indexes.composite: [choose-order, predict-use]
    answer_key_available: true
    access: public
    notes: Good transfer problems; avoid reading solutions before attempt.
```

## Search policy

When a new domain or major branch is mapped, actively search for assessment material.

For a specific node, search again when:
- mastery is being considered;
- existing evidence is only tutor-generated;
- a high-stakes claim depends on the node;
- the catalog has a known gap.

Do not waste time searching endlessly for external questions when none reasonably exist. Record the gap.

## Attempt integrity

Before an external assessment attempt:
- do not show solutions;
- avoid teaching from the exact answer key immediately beforehand;
- preserve item wording only to the extent legally/permissibly available;
- identify open-book vs closed-book conditions;
- record accommodations/tools used if relevant.

Store attempt metadata in `assessments/attempts/NNNN-<slug>.yaml`.

Suggested fields:

```yaml
attempt_id: AT0004
assessment_id: A007
date: 2026-08-22
conditions:
  open_book: false
  time_limit_minutes: 45
  hints: 0
score:
  raw: 17
  max: 20
  percent: 85
mapped_results:
  db.indexes.composite:
    outcome_ids: [choose-order, predict-use]
    judgment: strong
notes: ...
```

A real percent score may be reported because it comes from an actual instrument. Do not turn it directly into an 85% "mastery" estimate.

## Item selection

Avoid cueing:
- do not make the correct multiple-choice option consistently longer/more specific;
- randomize position when practical;
- use free recall/open response whenever that better matches the competency.

Prefer questions that force production over recognition when the target skill is productive.

## Feedback

For formative work, give feedback quickly after a meaningful attempt.

For summative/external work, follow the assessment's intended conditions first, then review errors deeply:
- what the learner thought;
- where reasoning diverged;
- whether the issue is knowledge, skill execution, wording, or prerequisite;
- which map outcomes should be updated.

A wrong answer is valuable evidence. Record persistent misconceptions when they affect future teaching.
