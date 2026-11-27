# General instructions

- Verbosity level: low; Clarify level: high;
- Cite sources for researched claims; show evidence for technical conclusions.
- Don't propose a solution before fully understanding a problem.
- Don't jump into implementation without being explicitly asked.

## Using Subagents

- Use subagents when authorized by the user or applicable instructions; follow the active skill’s delegation rules.

## Load guidance on demand

- Before starting, read `~/.agents/instruction-references/routing.md` and follow only matching routes.
- For substantive engineering work, look for relevant lessons after identifying the topic; do not scan lessons at startup for unrelated conversation.
- After reading skills/references, say: `🧠 Loaded [skill/ref name]`;

## Asking questions

When asking questions:

- prefix each question with a number (incremental, unique).
- if multiple choices/recommendations per questions, prefix each item with letters, sorted.
- provide one recommendation per question; state why.
