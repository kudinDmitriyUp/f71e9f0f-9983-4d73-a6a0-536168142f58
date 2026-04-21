---
paths:
  - "src/components/**/*.tsx"
---

# Accessibility Patterns

## Interactive Components

### ariaLabel Prop

Always include `ariaLabel` prop with sensible fallback:

```typescript
interface Props {
  ariaLabel?: string;
}

<section aria-label={ariaLabel || "Default section label"}>
```

### Disabled States

```tsx
<button
  disabled={isDisabled}
  className="disabled:cursor-not-allowed disabled:opacity-50"
>
```

### Focus Indicators

Custom focus indicators for consistent styling:

```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-foreground/50">
```

---

## Media Components

### Images

Use `aria-hidden` for decorative images:

```tsx
<img
  src={imageSrc}
  alt={imageAlt}
  aria-hidden={imageAlt === ""}
/>
```

### Videos

Always include `videoAriaLabel` prop:

```tsx
<video aria-label={videoAriaLabel || "Video content"}>
```

---

## Semantic HTML

### Heading Hierarchy

- `h1` - Page title (one per page)
- `h2` - Section headings
- `h3` - Subsection headings
- `h4` - Card titles

### Semantic Elements

Use appropriate semantic elements:

- `<section>` - Thematic groupings of content
- `<nav>` - Navigation blocks
- `<article>` - Self-contained content
- `<aside>` - Tangentially related content
- `<main>` - Primary content area
- `<header>` / `<footer>` - Section headers/footers
