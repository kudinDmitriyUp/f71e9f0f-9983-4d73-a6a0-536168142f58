---
name: code-review
description: Frontend code review checklist for React, TypeScript, and Tailwind
---

# Frontend Code Review

Review recently changed files against this checklist.

## Process

1. **Identify Changed Files**
   - Run `git diff --name-only` to find modified files
   - Focus on `.tsx`, `.ts` files in `src/`

2. **Review Each File**

### TypeScript

- [ ] No `any` types (use proper types or `unknown`)
- [ ] Interfaces for component props
- [ ] No unused imports or variables
- [ ] Proper error handling (no silent catches)

### React Patterns

- [ ] `"use client"` only when needed (hooks, events, browser APIs)
- [ ] No unnecessary `React.memo`
- [ ] Stable callbacks with `useCallback` when passed as props
- [ ] Cleanup in `useEffect` (event listeners, subscriptions, GSAP)
- [ ] Keys on mapped elements (not index unless static list)

### Component Structure

- [ ] Logic extracted to hooks (if complex)
- [ ] Props interface defined
- [ ] Default export at bottom

### Tailwind/Styling

- [ ] Using `cls()` for conditional classes
- [ ] Responsive classes (mobile-first)
- [ ] No hardcoded colors (use CSS variables)
- [ ] Proper z-index layering

### Performance

- [ ] Images use `next/image` with proper sizing
- [ ] Heavy components use dynamic import if below fold
- [ ] No unnecessary re-renders (check deps arrays)

### Accessibility

- [ ] Interactive elements are focusable
- [ ] Images have alt text
- [ ] Buttons have accessible names
- [ ] `aria-hidden` on decorative elements

3. **Report Findings**
   - List issues grouped by severity: Critical, Warning, Suggestion
   - Provide specific line numbers and fixes
