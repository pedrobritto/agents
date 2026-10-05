---
name: self-improving
description: Capture a concise reusable lesson when the user asks to learn from mistakes, self-improve, or save a lesson. Not for automatic logging or routine lesson retrieval.
---

# Save a lesson

1. Identify the demonstrated mistake, its cause, and the narrow condition where a prevention rule helps. Use session evidence; do not invent failures or universalize one preference.
2. Inspect `~/.agents/self-improving/` filenames and read relevant existing lessons. Update an overlapping lesson instead of duplicating it.
3. For a new lesson, choose the next numeric ID after the greatest existing filename prefix (start at `0000`), padded to at least four digits. Save `<id>--<category>--<descriptive-topic>.md`; use lowercase kebab-case names.
4. Keep only concise bullets: **Applies when**, **Problem**, **Do instead**, and **Verify**. Make the trigger and prevention concrete enough for another agent to act on.
5. Exclude secrets, unnecessary personal information, and session transcripts. Ensure the target does not already exist before creating it; reselect the ID on collision.
6. Report the saved absolute path and the behavior the lesson should change.

Create the folder only when saving is requested. Do not rewrite AGENTS.md or unrelated skills as part of recording a lesson.
