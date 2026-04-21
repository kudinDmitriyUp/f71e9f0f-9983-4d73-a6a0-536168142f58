---
paths:
  - "src/components/text/**/*.tsx"
  - "src/components/hooks/**/*.ts"
  - "src/components/sections/**/*.tsx"
---

# Animation Patterns

## Button Animation Types

Apply to `tagAnimation` or `buttonAnimation` props:

```typescript
type ButtonAnimationType = "none" | "opacity" | "slide-up" | "blur-reveal";
```

- `none` - No animation
- `opacity` - Fade in
- `slide-up` - Fade + slide from bottom
- `blur-reveal` - Fade with blur clearing

---

## Text Animation Types

Set via `defaultTextAnimation` in ThemeProvider or `type` prop in TextAnimation:

```typescript
type AnimationType = "entrance-slide" | "reveal-blur" | "background-highlight";
```

- `entrance-slide` - Characters slide up from bottom
- `reveal-blur` - Text appears with blur clearing
- `background-highlight` - Text highlights from dim to full opacity

---

## Animation Hooks

```typescript
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";

// Animate children on scroll
const { containerRef } = useButtonAnimation({ animationType: "slide-up" });
<div ref={containerRef}>
  <button>Animates on scroll</button>
</div>
```

---

## CardStack Animation Types

- `none` - No animation
- `opacity` - Fade in
- `slide-up` - Slide with stagger
- `scale-rotate` - Scale + rotate with stagger
- `blur-reveal` - Blur to clear with stagger
- `depth-3d` - 3D perspective (grid only, desktop)

---

## GSAP Best Practices

### Plugin Registration

Register plugins at file level, not in useEffect:

```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

### Cleanup with gsap.context()

Always use gsap.context() for proper cleanup:

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".element", { opacity: 1 });
  }, containerRef);

  return () => ctx.revert();
}, []);
```

### Performance

- Use `force3D: true` for GPU acceleration
- Prefer transform properties (x, y, scale, rotation)
- Consider disabling complex animations on mobile
