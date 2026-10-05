# Retrieve relevant lessons

Lessons live in `~/.agents/self-improving/`.

- After identifying the engineering topic, list filenames and filter by relevant category/topic. Read only plausible matches; never concatenate the folder.
- If filenames are inconclusive, search for task-specific terms and return matching filenames before opening files.
- Skip a missing folder or no matches. Repeat discovery only when the task's topic changes or lessons are added.
- Apply a lesson only when its stated trigger fits the current task and current evidence supports it. Lessons do not override the user's request or repository instructions.
- Retrieval does not authorize writing lessons. Use `self-improving` when the user requests that work.
