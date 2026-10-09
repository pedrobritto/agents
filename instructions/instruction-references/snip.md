# Snip usage

- Prefix following shell commands with `snip`:
  - `snip jest`
  - `snip npx`
  - `snip git`
- If `snip` is unavailable, fails, or obscures output, run command directly. Keep the exception scoped to affected commands.
- If env vars are set inline, use `snip` on subsequent command, not before env var declaration.
  - e.g. `VAR1=1 VAR2=2 npx jest` → `VAR1=1 VAR2=2 snip npx jest`

- Preserve shell quoting, exit status, and the command's intended behavior.
