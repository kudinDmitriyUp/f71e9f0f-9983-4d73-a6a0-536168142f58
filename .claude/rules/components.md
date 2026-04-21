---
paths:
  - "src/components/**/*.tsx"
---

# Component Patterns

## Naming Conventions (CRITICAL)

### Prop Naming

| Use | Don't Use |
|-----|-----------|
| `title` | `heading`, `headline` |
| `description` | `subtitle`, `text`, `content` |
| `text` (for buttons) | `title`, `label`, `buttonText` |

### className Prop Pattern

- `className` - Main wrapper element
- `containerClassName` - Inner container
- `[element]ClassName` - Specific elements (titleClassName, imageClassName)

### ButtonConfig

```typescript
// CORRECT - variant controlled by ThemeProvider
{ text: "Get Started", href: "/start" }

// WRONG - never specify variant in config
{ text: "Get Started", variant: "primary" }  // ❌
```

---

## Component Composition Principle (CRITICAL)

When creating new components, **ALWAYS base them on existing similar components** to maintain consistency.

### The Rule

1. **Identify the base component** - Find an existing component with similar layout/purpose
2. **Identify feature components** - Find existing implementations of any features you're adding
3. **Confirm with user** - Propose which components you'll use as references before implementing
4. **Compose, don't reinvent** - Use patterns, code structure, and styling from the base components

---

## Canonical Base Components

### Hero Sections
| Component | Use As Base When |
|-----------|------------------|
| `HeroSplit` | Split layouts with media left/right positioning |
| `HeroBillboard` | Full-width centered layouts with media below |
| `HeroOverlay` | Media backgrounds with text overlay |

### Feature Sections
| Component | Use As Base When |
|-----------|------------------|
| `FeatureBento` | Complex card layouts with multiple variants |
| `FeatureCardOne` | Simple media + text card grids |
| `FeatureCardSix` | Sequential process/step displays |

### Testimonial Sections
| Component | Use As Base When |
|-----------|------------------|
| `TestimonialCardThirteen` | Card-based testimonials with ratings |
| `TestimonialCardTen` | Testimonials with associated media |

### Other Sections
| Component | Use As Base When |
|-----------|------------------|
| `PricingCardThree` | Comparison tables with feature lists |
| `TeamCardOne` | Image-first cards with overlay text |
| `ContactSplitForm` | Forms with media split layout |
| `FaqDouble` | Two-column accordion layouts |
| `FooterBase` | Simple column-based footers |
| `MetricCardOne` | Large number displays with gradient effects |
| `BlogCardOne` | Content cards with metadata and images |
| `SplitAbout` | Split layouts with bullet points |

---

## Canonical Shared Components

Always use these existing implementations rather than creating new ones:

| Component | Purpose | File |
|-----------|---------|------|
| `MediaContent` | Image/video display | `/src/components/shared/MediaContent.tsx` |
| `AvatarGroup` | Avatar displays with overflow | `/src/components/shared/AvatarGroup.tsx` |
| `TestimonialAuthor` | Author/attribution cards | `/src/components/shared/TestimonialAuthor.tsx` |
| `LogoMarquee` | Scrolling logo displays | `/src/components/shared/LogoMarquee.tsx` |
| `Tag` | Theme-aware badges | `/src/components/shared/Tag.tsx` |
| `Badge` | Simple primary badges | `/src/components/shared/Badge.tsx` |
| `CardStack` | Grid/carousel layouts | `/src/components/cardStack/CardStack.tsx` |
| `CardStackTextBox` | Section headers | `/src/components/cardStack/CardStackTextBox.tsx` |
| `TextAnimation` | Animated text | `/src/components/text/TextAnimation.tsx` |

---

## Core Component Usage

### TextBox

```typescript
import TextBox from "@/components/Textbox";

// Default layout - centered stack
<TextBox
  title="Your Title"
  description="Your description text"
  tag="Optional Tag"
  tagIcon={Sparkles}
  buttons={[{ text: "Primary", href: "/action" }]}
  center={true}
/>

// Layout options: "default" | "split" | "split-actions" | "split-description" | "inline-image"
```

### Button

Buttons automatically get styling based on their index:
- **Index 0** = `primary-button` class with `text-primary-cta-text`
- **Index 1+** = `secondary-button` class with `text-secondary-cta-text`

### MediaContent

```typescript
import MediaContent from "@/components/shared/MediaContent";

<MediaContent
  imageSrc="/image.jpg"
  imageAlt="Description"
  imageClassName="rounded-theme"
/>

// Video takes precedence over image when both provided
<MediaContent
  videoSrc="/video.mp4"
  videoAriaLabel="Video description"
/>
```

### AnimationContainer

```typescript
import AnimationContainer from "@/components/sections/AnimationContainer";

<AnimationContainer>
  <div>Content animates in (fade + slide)</div>
</AnimationContainer>

<AnimationContainer animationType="fade">
  <div>Fades in only</div>
</AnimationContainer>
```
