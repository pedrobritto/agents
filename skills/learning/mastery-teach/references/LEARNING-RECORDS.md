# Learning records

Learning records are sparse, decision-grade notes. They are not session logs.

Path:
`learning-records/NNNN-<slug>.md`

Write one when:
- the learner demonstrates a non-trivial insight that changes the teaching floor;
- a meaningful prior skill is verified;
- a misconception is corrected;
- the mission changes because of learning;
- a recurring failure pattern is discovered;
- a map assumption about the learner is invalidated.

Do not write one merely because a lesson was covered.

## Format

```md
---
id: LR-0007
date: 2026-08-22
status: active
nodes:
  - db.indexes.composite
---

# Column order is workload-dependent

The learner independently explained why equality/range/order requirements change useful composite-index ordering and validated the reasoning against a query plan.

## Evidence
E0017, E0018.

## Teaching implication
Future indexing work can assume the basic ordering heuristic, but should test transfer to partial and covering indexes.
```

Optional:
- `supersedes: LR-0002`
- `misconception: ...`

If later evidence contradicts a record, mark it superseded rather than deleting history.
