---
paths:
  - "src/**/*.tsx"
  - "src/**/*.css"
---

# Styling Patterns

This codebase uses **custom-defined CSS variables** for all sizing, spacing, and dimensions. **DO NOT use default Tailwind classes** that are not defined in this system.

---

## What NOT to Use

These default Tailwind classes are **NOT defined** and will not work:

```tsx
// DO NOT USE - undefined width classes
w-xs, w-sm, w-md, w-lg, w-xl, w-2xl, w-3xl, w-4xl, w-5xl, w-6xl, w-7xl
w-screen, w-min, w-max, w-fit (except these work)
w-96, w-80, w-72, w-64, w-56, w-48 (fixed pixel widths)

// DO NOT USE - undefined height classes
h-screen (use h-svh instead), h-min, h-max
h-96, h-80, h-72, h-64, h-56, h-48 (fixed pixel widths except defined ones)

// DO NOT USE - undefined spacing beyond 8
p-9, p-10, p-11, p-12, p-14, p-16, p-20, p-24, etc.
m-9, m-10, m-11, m-12, m-14, m-16, m-20, m-24, etc.
gap-9, gap-10, gap-11, gap-12, etc.

// DO NOT USE - undefined border radius
rounded-2xl, rounded-3xl (use rounded-theme or rounded-theme-capped)
```

---

## What TO Use

| Category | Use These | Don't Use |
|----------|-----------|-----------|
| **Width** | `w-5` to `w-100`, `w-content-width`, fractions | `w-xs`, `w-md`, `w-lg`, `w-96` |
| **Height** | `h-4` to `h-12`, `h-30`, `h-90` to `h-150`, `h-svh` | `h-screen`, `h-96`, `h-80` |
| **Padding** | `p-1` to `p-8` | `p-9`, `p-10`, `p-12`, `p-16` |
| **Margin** | `m-1` to `m-8` | `m-9`, `m-10`, `m-12`, `m-16` |
| **Gap** | `gap-1` to `gap-8` | `gap-9`, `gap-10`, `gap-12` |
| **Text** | `text-2xs` to `text-9xl` | (all defined) |
| **Radius** | `rounded-theme`, `rounded-theme-capped` | `rounded-2xl`, `rounded-3xl` |

---

## Spacing Scale (1-8 ONLY)

All spacing uses VW-based fluid scaling. **Only values 1-8 are defined:**
- `p-1` to `p-8`, `m-1` to `m-8`, `gap-1` to `gap-8`
- Directional: `px-4`, `py-6`, `mx-2`, `my-4`, etc.

---

## Content Width (CRITICAL FOR SECTIONS)

**`w-content-width`** is the most important width class - use it for all section content containers:

```tsx
// ALWAYS use w-content-width for section containers
<section className="relative w-full">
  <div className="w-content-width mx-auto">
    {/* Section content goes here */}
  </div>
</section>

<div className="w-content-width" />              // Main content width
<div className="w-content-width-expanded" />     // Expanded (for carousels)
```

---

## Width Scale

| Pattern | Values | Notes |
|---------|--------|-------|
| `w-5` to `w-100` | Increments of 5 (5vw to 100vw) | Main width classes |
| `w-7_5`, `w-12_5`, etc. | Increments of 2.5 | Half-step widths |
| `w-carousel-item-3`, `w-carousel-item-4` | Carousel widths | For carousel items |
| `w-full`, `w-1/2`, `w-1/3`, etc. | Standard fractions | Tailwind defaults work |

---

## Height Scale

Heights use standard rem on desktop, but become vw-based on mobile (< 768px).

- **Standard**: `h-4` to `h-12` (1rem to 3rem)
- **Large**: `h-30`, `h-90` to `h-150` (for larger containers)
- **Viewport**: Use `h-svh` instead of `h-screen`

---

## Text Sizes

`text-2xs` to `text-9xl` - all fluid (clamp-based).

Key sizes:
- `text-base` - body text
- `text-6xl` - section headings
- `text-7xl`/`text-8xl` - hero headings

---

## Border Radius

Use theme-aware classes:
- `rounded-theme` - uses ThemeProvider setting
- `rounded-theme-capped` - max xl

---

## Hero Page Padding

Special padding for hero sections that accounts for navbar:

```tsx
<section className="py-hero-page-padding" />           // Standard
<section className="py-hero-page-padding-half" />      // Half
<section className="py-hero-page-padding-1_5" />       // 1.5x
<section className="py-hero-page-padding-double" />    // Double
```

---

## Color Variables

Defined in `src/app/styles/variables.css`:

```css
--background: #f5f4ef        /* Page background */
--card: #dad6cd              /* Card backgrounds */
--foreground: #2a2928        /* Text color */
--primary-cta: #2a2928       /* Primary button background */
--primary-cta-text: #f5f4ef  /* Primary button text */
--secondary-cta: #ecebea     /* Secondary button background */
--secondary-cta-text: #2a2928 /* Secondary button text */
--accent: #ffffff            /* Accent highlights, glows */
--background-accent: #c6b180 /* Accent variant */
```

Use as Tailwind classes: `bg-background`, `text-foreground`, etc.

---

## Dynamic CSS Classes

These classes are styled based on ThemeProvider configuration:

```tsx
<div className="card rounded-theme p-6">Card content</div>
<button className="primary-button rounded-theme px-6 py-3">Primary</button>
<button className="secondary-button rounded-theme px-6 py-3">Secondary</button>
```

---

## Inverted Background Pattern

For sections that need dark backgrounds:

```typescript
// Required prop - forces explicit choice
useInvertedBackground: boolean

// Usage in component
<section className={cls("w-full", useInvertedBackground && "bg-foreground")}>
  <p className={useInvertedBackground ? "text-background" : "text-foreground"}>
    Content
  </p>
</section>
```

---

## Using CSS Variables Directly

When you need values not available as Tailwind classes:

```tsx
<div className="bottom-[calc(var(--spacing-4)+var(--spacing-4))]" />
<div className="left-[calc(var(--vw-1)*2)]" />
```
