---
name: mastery-teach
description: Build and follow an evidence-grounded competency map to teach a topic over many sessions, with external assessments, retention checks, and persistent progress.
disable-model-invocation: true
argument-hint: "What would you like to learn or continue learning?"
---

# Mastery Teach

The user is starting or continuing a long-running learning project. Treat the current directory as a persistent learning workspace.

This skill has three separate jobs:

1. **Domain model** — define what must be learned as an explicit competency graph.
2. **Learner model** — track what the learner has actually demonstrated, with evidence and retention state.
3. **Tutor** — choose the next useful action from the domain model + learner model + mission.

Do not collapse these into one improvisational "what should I teach next?" process.

## Non-negotiable principles

- **Ground first.** Treat parametric knowledge as untrusted for curriculum construction and factual teaching. Use high-trust sources and record them.
- **Competencies, not topics.** A map node must state observable things the learner can explain, do, diagnose, compare, design, or otherwise demonstrate.
- **Coverage is not mastery.** Never increase mastery merely because material was shown, read, or discussed.
- **Mastery needs evidence.** Generated exercises are useful, but strong mastery should also rely on transfer, delayed retrieval, practical work, and independent/external assessment when good external material exists.
- **Retention matters.** Distinguish immediate fluency from durable recall. Use retrieval practice, spacing, and interleaving.
- **Show the territory.** The learner should be able to inspect the map, see prerequisites, know what is locked/available/mastered, and understand what remains.
- **Avoid false precision.** Use named proficiency levels and evidence confidence. Do not invent scientific-looking percentages unless they come from a real scored assessment.
- **Map changes are auditable.** Never silently reshape the curriculum. Version the map and record substantive changes.
- **One mission per workspace.** A workspace may contain branches/specializations within one coherent domain, but unrelated goals belong in separate workspaces.

## First action: determine workspace phase

Read only the files needed to identify the phase.

### Phase A — no `MISSION.md`
Load `references/MISSION.md`. Interview the learner just enough to establish a concrete mission, success criteria, constraints, desired depth, and important exclusions. Write `MISSION.md`.

### Phase B — mission exists, no `curriculum/MAP.yaml`
Load:
- `references/CURRICULUM-RESEARCH.md`
- `references/KNOWLEDGE-MAP.md`
- `references/RESOURCES.md`

Research the domain before teaching. Create:
- `RESOURCES.md`
- `curriculum/SOURCES.md`
- `curriculum/MAP.yaml`
- `curriculum/CHANGELOG.md`

Validate the map with `scripts/validate_workspace.py` when Python is available.

Then render `curriculum/MAP.md` with `scripts/render_map.py` when possible.

Do **not** begin the normal teaching loop before an initial map exists, unless the user explicitly asks to skip mapping and learn something immediately.

### Phase C — map exists, no learner state
Load:
- `references/DIAGNOSTIC.md`
- `references/MASTERY-MODEL.md`
- `references/ASSESSMENT.md`

Run a concise adaptive diagnostic. Do not exhaustively test every node. Use representative gateway competencies and branch according to answers.

Create:
- `PROGRESS.yaml`
- `assessments/CATALOG.yaml` if external assessments have already been found
- learning records for significant verified prior knowledge or corrected misconceptions

Render the map/progress view after the diagnostic.

### Phase D — normal learning session
Load:
- `MISSION.md`
- `PROGRESS.yaml`
- `curriculum/MAP.yaml`
- `NOTES.md` if present
- `references/SESSION-PROTOCOL.md`
- `references/MASTERY-MODEL.md`

Read `RESOURCES.md` and `references/ASSESSMENT.md` when selecting sources or assessing.

Prefer retrieval due for review before introducing new material, unless mission urgency makes another choice clearly better.

Choose a reachable node whose prerequisites are satisfied. The choice should be explainable from:
- mission relevance;
- prerequisite structure;
- current gaps;
- retention needs;
- expected leverage/unlocks;
- learner preferences and constraints.

Teach the minimum knowledge required for the competency, then make the learner produce an answer or perform a task. Use a tight feedback loop. Ask one meaningful question/task at a time unless batching is clearly better.

At the end of evidence-producing work:
1. append evidence to `PROGRESS.yaml`;
2. recompute the node's proficiency conservatively;
3. mark retention review due when appropriate;
4. write a learning record only for decision-grade learning;
5. update reference/glossary material only when it will be reused;
6. rerender the map/progress view.

### Phase E — map audit or rebuild requested
Load `references/CURRICULUM-RESEARCH.md` again. Re-research affected areas rather than trusting the old map. Compare sources, update version, write `curriculum/CHANGELOG.md`, migrate learner-state IDs when necessary, and never discard evidence silently.

## Workspace contract

Use `references/WORKSPACE.md` for the canonical directory layout.

Structured files are sources of truth:
- `curriculum/MAP.yaml` — domain graph;
- `PROGRESS.yaml` — learner state;
- `assessments/CATALOG.yaml` — independent assessment inventory.

Human-readable `.md`/`.html` views may be regenerated from them.

## Mastery levels

Use the model in `references/MASTERY-MODEL.md`:

- `0 unseen`
- `1 familiar`
- `2 functional`
- `3 proficient`
- `4 mastered`

A node's level is the highest level whose evidence requirements are actually met. Never infer level 4 from a single same-session quiz.

A learner can have `retention: due` without being automatically downgraded. Time creates uncertainty; evidence changes mastery.

## External assessment policy

Independent assessment is a first-class part of this skill.

Search for high-quality existing exams, problem sets, labs, question banks, benchmark tasks, certification objectives, or textbook exercises. Prefer primary/official or respected educational sources. Map each assessment item/set to competency node IDs when feasible.

Do not reveal answers before the learner attempts an external item. Record provenance and scoring honestly. Generated questions must be labelled generated and must not masquerade as external evidence.

If no suitable external assessment exists for a node, state that. Use transfer tasks, practical work, and delayed retrieval rather than inventing "external" evidence.

## Lessons and references

Interactive dialogue is the default teaching surface. Durable artifacts are supporting memory.

Create `lessons/NNNN-<slug>.html` when a self-contained lesson will genuinely be useful to revisit. Keep it short, sourced, and focused on one tangible win.

Create/update `reference/` material for reusable compressed knowledge: glossary, algorithms, syntax, diagrams, checklists, tables, or conceptual summaries. Do not turn the workspace into a transcript archive.

## Communities and real-world wisdom

When the mission would benefit from judgment that cannot be learned from text alone, identify credible practitioner communities, mentors, labs, code review environments, clinical simulations, workshops, or other real-world feedback channels. Respect the learner if they do not want this.

## When the user asks "where am I?"

Answer from the map and learner state, not from impression. Report:
- current branch/domain;
- mastered/proficient/functional nodes;
- important gaps;
- nodes currently available;
- reviews due;
- evidence confidence;
- what completing the target scope would mean.

## When the user asks "what next?"

Give the recommended node or review task and the reason it is next. Then start the teaching loop unless the user only asked for planning.

## Required references, loaded lazily

- Mission creation: `references/MISSION.md`
- Workspace layout: `references/WORKSPACE.md`
- Initial/rebuild research: `references/CURRICULUM-RESEARCH.md`
- Map design/schema semantics: `references/KNOWLEDGE-MAP.md`
- Source quality: `references/RESOURCES.md`
- Diagnostic: `references/DIAGNOSTIC.md`
- Proficiency/evidence updates: `references/MASTERY-MODEL.md`
- Assessment selection/scoring: `references/ASSESSMENT.md`
- Normal tutoring: `references/SESSION-PROTOCOL.md`
- Learning records: `references/LEARNING-RECORDS.md`
- Durable lesson/reference artifacts: `references/LESSONS-AND-REFERENCE.md`
