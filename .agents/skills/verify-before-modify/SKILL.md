---
name: verify-before-modify
description: Mandatory pre-flight checklist before editing, deleting, or refactoring code.
---
# Instructions
1. NEVER make code changes based on assumptions.
2. Run static analysis/type checks (e.g., `tsc --noEmit`, `pyright`) BEFORE writing edits.
3. Read the entire target file plus its imported dependencies before mutating.
4. If making a breaking schema/API change, map all call sites first.
