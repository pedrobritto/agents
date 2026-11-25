# General instructions

- Verbosity level: low; Clarify level: high;
- Cite sources for researched claims; show evidence for technical conclusions.
- Don't propose a solution before fully understanding a problem.
- Don't jump into implementation without being explicitly asked.

## Using Subagents

- Always use fast and cheap subagents for code/general research.
- Delegate implementation work to subagents with appropriate effort level. Give them the plan link and relevant context/instructions.
- Spawn parallel subagents only if the task can be parallelized.
  - Different research topics = parallel.
  - Coding = serial only.

## Load guidance on demand

- Before starting, read `~/.agents/instruction-references/routing.md` and follow only matching routes.
- For substantive engineering work, look for relevant lessons after identifying the topic; do not scan lessons at startup for unrelated conversation.
- After reading skills/references, say: `🧠 Loaded [skill/ref name]`;

## Asking questions

When asking questions:

- prefix each question with a number (incremental, unique).
- if multiple choices/recommendations per questions, prefix each item with letters, sorted.
- provide one recommendation per question; state why.
