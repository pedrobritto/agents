# Mastery model

The learner model is evidence-based. A level is a claim about demonstrated capability, not exposure.

## Levels

### 0 — unseen

No meaningful evidence yet.

This may also be used when the learner has only heard the term.

### 1 — familiar

The learner can recognize the concept and give a basically correct explanation with low complexity or some cueing.

Typical evidence:
- accurate basic explanation;
- recognition/discrimination;
- simple worked example with guidance.

This is not enough to rely on the skill as a prerequisite for difficult work.

### 2 — functional

The learner can independently perform canonical tasks in the competency and explain the main reasoning.

Typical evidence:
- correct standard problems without hints;
- correct implementation/procedure in a familiar context;
- ability to explain common errors.

This is the usual minimum prerequisite level for downstream nodes.

### 3 — proficient

The learner can handle unfamiliar or mixed problems, choose among alternatives, diagnose failures, and justify tradeoffs.

Typical evidence:
- novel problems;
- debugging/diagnosis;
- design decisions;
- mixed/interleaved exercises;
- practical tasks with incomplete scaffolding;
- strong external assessment performance.

### 4 — mastered

The learner has proficient capability plus evidence that it is durable and transferable.

Mastery normally requires:
- proficiency-level evidence;
- successful delayed retrieval after a meaningful interval;
- at least one transfer/integrative/practical task;
- independent/external evidence when a suitable source exists;
- coverage of all critical node outcomes;
- no unresolved major misconception.

Do not award level 4 from one same-session generated quiz.

## Evidence is multidimensional

Each evidence item in `PROGRESS.yaml` should record:

```yaml
- id: E0017
  node: db.indexes.composite
  date: 2026-08-22
  type: novel_problem
  source: tutor_generated
  assessment_id: null
  outcome_ids: [choose-order, predict-use]
  result: pass
  quality: strong
  independence: independent
  notes: Correctly rejected redundant index and justified order.
```

Suggested `type` values:
- explanation
- canonical_task
- novel_problem
- diagnosis
- design
- practical_task
- external_assessment
- delayed_retrieval
- transfer
- prior_claim

`prior_claim` is useful context but weak evidence until verified.

## Evidence confidence

Track confidence separately from proficiency.

Use:
- `low` — sparse, narrow, self-reported, highly scaffolded, or stale evidence;
- `moderate` — multiple independent demonstrations across more than one mode;
- `strong` — diverse evidence, including novel/transfer and delayed evidence; external evidence when available.

Do not convert this into fake decimals.

## Retention

A level does not decay merely because time passes. Instead track:

- `fresh` — recent relevant evidence;
- `due` — enough time has passed that retrieval should be checked;
- `confirmed` — delayed retrieval succeeded;
- `uncertain` — delayed retrieval failed or evidence conflicts.

If delayed retrieval fails:
1. record the failure;
2. set retention `uncertain`;
3. lower proficiency only when the failure demonstrates the level claim is no longer supported;
4. schedule targeted reactivation.

Spacing intervals should adapt to the skill and learner. A practical default for conceptual material is an early review after a few days, then around 1–2 weeks, then longer intervals after successful retrieval. Do not rigidly pretend one schedule fits every domain.

## Outcome coverage

A node can have a high score on one exercise but still contain a gap.

Maintain `outcome_state` in learner state:

```yaml
outcome_state:
  choose-order: demonstrated
  predict-use: demonstrated
  identify-redundancy: weak
```

Values:
- `unknown`
- `introduced`
- `demonstrated`
- `weak`

Level promotion must consider the node's critical outcomes, not only total correct answers.

## Conservative promotion

Promotion should be monotonic only when evidence supports it. Do not promote to be encouraging.

A useful default:
- 1 requires at least one meaningful correct demonstration;
- 2 requires independent canonical performance across the critical outcomes;
- 3 requires novel/mixed/diagnostic evidence and reasoning;
- 4 follows the mastery requirements above.

Demotion is allowed when new evidence clearly contradicts the current level. Record why.
