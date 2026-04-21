---
name: add-animation
description: Add animation to a component with proper setup and cleanup
disable-model-invocation: true
---

# Add Animation

Add animation to: $ARGUMENTS

## Process

1. **Choose animation library**
   - GSAP: Complex timelines, ScrollTrigger, text splitting
   - Framer Motion: Simple component animations, gestures, layout
   - CSS: Basic transitions, hover states

2. **For GSAP animations**
   - Register plugins at file level
   - Use `gsap.context()` for cleanup
   - Return `() => ctx.revert()` from useEffect
   - Use refs for target elements

3. **For Framer Motion**
   - Wrap conditionally rendered elements in `AnimatePresence`
   - Add `key` prop for AnimatePresence children
   - Use `initial`, `animate`, `exit` props

4. **For scroll-triggered animations**
   - Set appropriate `start` and `end` points
   - Use `toggleActions` for replay behavior
   - Consider mobile: disable or simplify

5. **Performance considerations**
   - Use transform properties (x, y, scale, rotation)
   - Add `force3D: true` for GPU acceleration
   - Check if animation should be disabled on mobile

## Output

Show the implemented animation code with proper cleanup.
