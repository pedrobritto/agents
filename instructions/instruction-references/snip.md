# Shell output

- Prefix shell commands with `snip`, for example `snip git status` or `snip rg pattern path`.
- If `snip` is unavailable, fails, or obscures output, run command directly. Keep the exception scoped to affected commands.
- Before retrying a command with side effects, check whether it already ran. A wrapper failure does not prove the underlying command failed.
- Preserve shell quoting, exit status, and the command's intended behavior.
- If env vars are set inline, use `snip` on subsequent command, not before env var declaration.
  - e.g. `VAR1=1 VAR2=2 npx jest` → `VAR1=1 VAR2=2 snip npx jest`
