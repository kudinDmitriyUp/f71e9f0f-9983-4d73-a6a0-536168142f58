---
name: refactor
description: Systematic refactoring workflow for safe code improvements
disable-model-invocation: true
---

# Refactor

Refactor: $ARGUMENTS

## Process

1. **Understand current state**
   - Read the code to refactor
   - Identify what it does and why
   - Note all usages/dependencies
   - Check for existing tests

2. **Define the goal**
   - What problem are we solving?
   - Readability? Performance? Maintainability?
   - What should NOT change? (behavior, API, **UI**)

3. **Plan changes**
   - Break into small, safe steps
   - Each step should leave code working
   - Identify risk points

4. **Execute incrementally**
   - One change at a time
   - Verify after each step
   - Keep commits atomic

5. **Common refactors**
   - Extract function/component
   - Rename for clarity
   - Simplify conditionals
   - Remove duplication
   - Split large files
   - Move code to better location

6. **Verify**
   - Run existing tests
   - Test affected functionality
   - Check for regressions
   - Ensure behavior unchanged

7. **UI Preservation (Critical)**
   - Compare CSS classes line by line before consolidating
   - Duplicate code may have subtle differences (sizes, colors)
   - Never assume - verify before merging branches

## Output

Report changes made, files affected, and verification steps taken.
