# Curriculum research protocol

Load this file during initial curriculum construction or a requested audit/rebuild. It is intentionally not part of every teaching session.

The goal is not to ask a model to "list everything about X". The goal is to construct a defensible competency graph from multiple independent sources.

## 1. Define the boundary

Read `MISSION.md`.

Write a short research boundary before searching:
- domain;
- target depth;
- core vs specialization;
- practical/theoretical balance;
- explicit exclusions;
- target learner context when it changes emphasis.

## 2. Gather curriculum-level sources

Prefer multiple independent sources with different failure modes.

Where the domain permits, aim for:
- official standards/specifications/documentation;
- respected university course syllabi and learning objectives;
- major textbooks or professional references;
- certification/body-of-knowledge objectives when respected;
- authoritative practice guidelines for regulated professions;
- benchmark projects, labs, or canonical problem sets;
- practitioner sources for real-world judgment, clearly distinguished from curricular authority.

Three independent strong curriculum-level sources is a useful minimum when available; more may be needed for broad domains. Do not satisfy a quota with weak sources.

Record every source used to define the map in `curriculum/SOURCES.md`, including:
- stable ID;
- title/author/institution;
- URL or bibliographic reference;
- date/version when relevant;
- source class;
- what part of the map it supports;
- limitations.

## 3. Extract capabilities, not chapter headings

For each source, extract what a competent learner is expected to **do**.

Bad:
- "Indexes"
- "Cardiology"
- "Promises"

Better:
- "Given a query workload, choose an index strategy and justify column order."
- "Interpret the major components of a 12-lead ECG in a systematic sequence."
- "Predict ordering and error propagation in a Promise chain and debug incorrect code."

Use observable verbs. Split nodes that require substantially different evidence or prerequisites.

## 4. Triangulate

Create a temporary coverage matrix:

```text
competency                         S1   S2   S3   S4
---------------------------------------------------
relational keys                    ✓    ✓    ✓
normalization to BCNF              ✓    ✓    ✓
serializability                    ✓    ✓         ✓
PostgreSQL VACUUM                       ✓         ✓
```

Use convergence as evidence of core importance, not as a mechanical voting rule.

Classify each node:
- `core` — required for the mission's general competence target;
- `supporting` — useful prerequisite or reinforcement;
- `specialization` — depth tied to a narrower branch;
- `optional` — useful enrichment outside completion criteria.

Also classify depth:
- `foundational`
- `intermediate`
- `advanced`
- `specialist`

## 5. Build prerequisites conservatively

A prerequisite means the later competency is meaningfully harder or incoherent without the earlier one.

Do not encode "usual textbook order" as dependency unless it is a true learning dependency.

Each prerequisite specifies a minimum learner level, usually `functional (2)` or `proficient (3)`.

Avoid a giant linear chain. Real domains should branch and reconverge.

## 6. Define outcomes and evidence

Each node gets 2–6 observable outcomes.

For each node, describe level-specific criteria sufficient to distinguish:
- familiar;
- functional;
- proficient.

Mastery is governed globally by the mastery model and adds durability/transfer evidence.

Identify plausible evidence modes:
- explanation/teach-back;
- canonical exercise;
- novel problem;
- diagnosis/debugging;
- design/creation;
- practical task;
- external assessment;
- delayed retrieval;
- transfer across contexts.

## 7. Search for independent assessments

During curriculum research, search for external assessment material:
- past examinations;
- problem sets;
- labs;
- official sample exams;
- textbook exercises;
- standardized question banks;
- benchmark tasks/projects.

Record promising materials in `assessments/CATALOG.yaml`. Do not download or reproduce copyrighted answer keys unnecessarily. Store links and mappings.

## 8. Completeness audit

Before declaring the initial map ready, ask:

- Are mission success criteria represented by nodes?
- Do core nodes cover the major themes repeated across strong sources?
- Are there suspicious gaps between foundational and advanced nodes?
- Are any nodes actually broad subjects hiding several competencies?
- Are prerequisites acyclic?
- Are specialized branches clearly separated from core completion?
- Can every core node be assessed somehow?
- Are important claims supported by current/version-appropriate sources?
- Are map uncertainties documented?

Add a `research_notes` section to `MAP.yaml` with known gaps/uncertainties.

## 9. Version and freeze

Write `curriculum/MAP.yaml` with `version: 1`.

Write `curriculum/CHANGELOG.md` with:
- date;
- version;
- research scope;
- notable design choices;
- known uncertainties.

After initialization, ordinary teaching sessions must not casually restructure the map. Small corrections may be made with a changelog entry. Broad changes require this research protocol again.
