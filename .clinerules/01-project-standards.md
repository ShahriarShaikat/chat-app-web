# Project Standards

- Work with the existing application; never scaffold a replacement.
- Inspect relevant files and existing patterns before proposing changes.
- Explain the root cause before fixing a bug.
- Make small, focused changes and avoid unrelated refactoring.
- Do not invent endpoints, types, database fields, or dependencies. Verify them in the source code.
- Preserve existing authentication and authorization behavior unless explicitly asked to change it.
- Never expose secrets, tokens, passwords, or environment variable values.
- Never reset, drop, or destructively modify the database without explicit approval.
- Ask before installing dependencies or changing architecture.
- After changes, run the relevant lint, type-check, build, and test commands available in package.json.
- Report which checks passed, which failed, and which were not run. Never claim a test passed without executing it.
- Review the final diff and explain each changed file.
