---
name: debug
description: Systematic debugging workflow to find and fix issues
disable-model-invocation: true
---

# Debug

Debug issue: $ARGUMENTS

## Process

1. **Understand the problem**
   - What is the expected behavior?
   - What is the actual behavior?
   - When did it start happening?
   - Is it reproducible?

2. **Gather information**
   - Check browser console for errors
   - Check terminal for server errors
   - Look at network requests
   - Check component props/state

3. **Isolate the cause**
   - Find the smallest reproduction
   - Identify which component/function is involved
   - Check recent changes to that area
   - Add console.logs or debugger statements

4. **Form hypothesis**
   - Based on evidence, what could cause this?
   - List possible causes in order of likelihood

5. **Test and fix**
   - Test most likely cause first
   - Make minimal change to fix
   - Verify fix doesn't break other things

6. **Verify**
   - Confirm original issue is resolved
   - Test related functionality
   - Remove debug statements

## Output

Report findings, root cause, and the fix applied.
