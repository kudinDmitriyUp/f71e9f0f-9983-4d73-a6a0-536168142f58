---
paths:
  - "src/components/**/*.tsx"
  - "src/hooks/**/*.ts"
---

# v2 to v4 Transformation

## Quick Reference

| v2 | v4 |
|----|-----|
| GSAP + ScrollTrigger | `motion/react` with `whileInView` |
| Character-level text hooks | `TextAnimation` component (word-level) |
| `buttons: ButtonConfig[]` | `primaryButton` / `secondaryButton` objects |
| 10+ className props | Single `className` prop |
| CardStack/TextBox wrappers | Direct composition |
| Complex media props | Discriminated union: `{ imageSrc } \| { videoSrc }` |

## Animation Variants

| v2 | v4 |
|----|-----|
| `entrance-slide` | `slide-up` |
| `reveal-blur` | `fade-blur` |
| `background-highlight` | `fade` |

## Allowed Hooks

Only 2 custom hooks exist in v4:
- `useCarouselControls` - Embla carousel state
- `useButtonClick` - Navigation handling

All other animation hooks are replaced by `TextAnimation`, `Button animate`, or inline `motion`.

## Standard Motion Animation

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-15%" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
```

## Props Pattern

```tsx
type SectionProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });
```

## Checklist

1. Replace GSAP with `motion/react`
2. Replace animation hooks with `TextAnimation` or `Button animate`
3. Use discriminated unions for media props
4. Use `primaryButton`/`secondaryButton` instead of buttons array
5. Remove all className props except single `className`
6. Replace CardStack with `GridOrCarousel`
7. Replace TextBox with direct `TextAnimation` + `Button` composition
8. Add `aria-label` to sections
9. Use `w-content-width` for containers
