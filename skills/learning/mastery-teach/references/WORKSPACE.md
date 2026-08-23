# Workspace layout

The learning workspace belongs to the learner. Initialize directories lazily when possible.

```text
MISSION.md                 # why, target scope, success criteria, constraints
RESOURCES.md               # vetted sources with stable IDs and intended use
NOTES.md                   # teaching preferences and durable working notes
PROGRESS.yaml              # source of truth for learner state

curriculum/
  MAP.yaml                 # source of truth for the competency graph
  MAP.md                   # generated human/visual view
  SOURCES.md               # sources used to construct/audit the curriculum
  CHANGELOG.md             # substantive map changes and migrations

assessments/
  CATALOG.yaml             # external/generated assessment inventory
  attempts/
    0001-....yaml          # attempt provenance, answers/results/mapping

learning-records/
  0001-....md              # decision-grade learning records

lessons/
  0001-....html            # optional durable lesson artifacts

reference/
  GLOSSARY.md
  *.md / *.html            # reusable compressed reference material

assets/
  ...                      # reusable assets for lesson/reference artifacts
```

## Source-of-truth rule

Machine-readable state wins when a generated view disagrees with it:

1. `curriculum/MAP.yaml`
2. `PROGRESS.yaml`
3. `assessments/CATALOG.yaml`

`curriculum/MAP.md` is a generated view and may be overwritten.

## Stable identifiers

Node IDs are durable API-like identifiers. Prefer hierarchical dot-separated IDs:

```text
db.relational.keys.primary
db.sql.joins.inner
db.transactions.isolation.anomalies
```

Do not rename IDs for cosmetic reasons. If an ID must change, record the migration in `curriculum/CHANGELOG.md` and migrate references in `PROGRESS.yaml` and assessment mappings.

Resource IDs use `R###`. Assessment IDs use `A###`. Evidence IDs use `E####`.

## Separation of concerns

`MAP.yaml` describes the domain, not this learner.

`PROGRESS.yaml` describes this learner, not the domain.

Do not store `mastered: true` inside map nodes. Do not put prerequisite definitions inside learner state.
