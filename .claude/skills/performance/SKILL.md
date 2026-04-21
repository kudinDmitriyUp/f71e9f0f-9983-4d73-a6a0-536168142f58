---
name: performance
description: Performance optimization workflow for frontend applications
disable-model-invocation: true
---

# Performance

Optimize: $ARGUMENTS

## Process

1. **Identify the problem**
   - What is slow? (initial load, interaction, render)
   - Measure current performance
   - Set a target improvement

2. **Analyze causes**
   - Large bundle size?
   - Unnecessary re-renders?
   - Expensive calculations?
   - Network waterfalls?
   - Layout thrashing?

3. **React optimizations**
   - Add `memo()` for expensive list items
   - Use `useMemo` for costly computations
   - Use `useCallback` for stable function refs
   - Split components to isolate re-renders
   - Lazy load with `dynamic()` or `React.lazy()`

4. **Bundle optimizations**
   - Code split large dependencies
   - Dynamic imports for heavy features
   - Tree shake unused code
   - Analyze with bundle analyzer

5. **Render optimizations**
   - Virtualize long lists
   - Debounce/throttle frequent updates
   - Use CSS transforms over layout properties
   - Avoid layout shifts

6. **Network optimizations**
   - Preload critical resources
   - Cache API responses
   - Optimize images (WebP, lazy load)
   - Reduce request waterfalls

7. **Verify improvement**
   - Measure after changes
   - Compare to baseline
   - Test on slow devices/networks

## Output

Report optimizations applied and measured improvements.
