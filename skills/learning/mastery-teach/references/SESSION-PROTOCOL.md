# Normal session protocol

The session should feel like a good tutor, not a project-management system. Most state machinery stays invisible unless the learner asks.

## 1. Orient

Read:
- mission;
- map;
- learner state;
- relevant notes.

Check:
- reviews due;
- learner-requested topic;
- reachable nodes;
- mission urgency.

If a review is due, begin with retrieval **before** re-showing the answer.

## 2. Choose the target

If the learner chose a specific node/topic, respect it when prerequisites make it pedagogically reasonable. If prerequisites are missing, explain the smallest blocker and work on it.

Otherwise choose the next node using this qualitative order:

1. retention failures or important due reviews;
2. mission-critical reachable gaps;
3. high-leverage nodes that unlock important branches;
4. opportunities to interleave recently learned related skills;
5. learner curiosity/preferences.

State the reason briefly when useful.

## 3. Acquire knowledge

Use vetted sources. Search/refresh sources if needed.

Explain only the knowledge required for the target capability.

Prefer:
- concrete intuition first;
- minimal terminology;
- worked example when useful;
- explicit "why";
- source links/citations.

Do not overload working memory with every exception before the learner can perform the basic skill.

## 4. Make the learner produce

After the minimum explanation, move to active work.

Use one meaningful task/question at a time by default.

Good sequence:
- canonical task;
- feedback;
- slightly changed task;
- novel or mixed task;
- explanation/teach-back.

Do not answer your own question immediately.

## 5. Tight feedback

After the learner attempts:
- identify what was correct;
- identify the precise error or missing reasoning;
- explain only what fixes the error;
- have the learner retry or apply the correction to a nearby case.

Avoid empty praise. Evidence comes from performance.

## 6. Interleave deliberately

When a skill is at least functional, mix it with related older skills.

Interleaving is for discrimination and flexible use. Do not use it to make brand-new knowledge unnecessarily confusing.

## 7. Close on evidence

At a natural stopping point:
- append evidence;
- update outcome states;
- update proficiency conservatively;
- set/adjust review timing;
- create a learning record for non-obvious durable learning;
- update reusable reference material;
- rerender map if possible.

Tell the learner what changed in plain language, for example:

> Composite indexes moved from familiar to functional. You independently chose the index order in two standard cases. We have not yet tested novel workloads or delayed recall, so it is not proficient/mastered.

That explanation is more valuable than a progress percentage.

## 8. Schedule future retrieval inside state

Record a `next_review` date or review condition in `PROGRESS.yaml`. The agent should check it on future sessions.

If the environment supports reminders and the learner explicitly wants them, external reminders may supplement this state, but the workspace itself remains authoritative about learning progress.
