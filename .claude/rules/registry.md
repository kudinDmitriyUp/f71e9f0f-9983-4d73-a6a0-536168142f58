---
paths:
  - "registry/**/*.json"
---

# Registry Patterns

The registry system enables AI tooling and code generation for components.

---

## Registry Files

| File | Purpose | When to Update |
|------|---------|----------------|
| `registry.json` | Full component configs with constraints | New component, prop changes |
| `registry/components/[Name].json` | Individual component config | New component, prop changes |
| `registry/schemas/[Name].schema.json` | Props schema for code gen | New component, prop changes |
| `registry/index.json` | Category/intent mapping | New component |
| `registry/intents.json` | Intent groupings | New component or intent |

---

## registry/index.json Entry

```json
{
  "ComponentName": {
    "category": "hero",
    "intent": "hero with media",
    "bestFor": ["landing pages", "product launches"],
    "avoidWhen": ["simple text-only sections"],
    "requires": ["title", "description", "background"],
    "import": "@/components/sections/hero/ComponentName"
  }
}
```

---

## registry/components/[Name].json Format

```json
{
  "name": "ComponentName",
  "description": "Brief description of the component",
  "details": "Detailed usage information",
  "constraints": {
    "textRules": {
      "title": {
        "required": true,
        "example": "Example title text",
        "minChars": 4,
        "maxChars": 50
      },
      "description": {
        "required": true,
        "example": "Example description text",
        "minChars": 20,
        "maxChars": 200
      }
    }
  },
  "propsSchema": {
    "title": "string",
    "description": "string",
    "optionalProp?": "string (default: 'value')"
  },
  "usageExample": "<ComponentName title=\"...\" />",
  "do": ["Use for X", "Use for Y"],
  "dont": ["Don't use for Z"],
  "editRules": {
    "textOnly": true,
    "layoutLocked": true,
    "styleLocked": true
  }
}
```

---

## registry/schemas/[Name].schema.json Format

```json
{
  "name": "ComponentName",
  "propsSchema": {
    "title": "string",
    "description": "string",
    "optionalProp?": "string (default: 'value')"
  }
}
```

---

## Props Schema Conventions

- Required props: `"propName": "type"`
- Optional props: `"propName?": "type (default: 'value')"`
- Arrays: `"items": "Array<{ name: string, value: string }>"`
- Complex types: Include description after type

Example:
```json
{
  "title": "string",
  "description": "string",
  "inputs": "Array<{ name: string, type: string, placeholder: string }> - Form input fields",
  "mediaPosition?": "'left' | 'right' (default: 'right')",
  "onSubmit?": "(data: Record<string, string>) => void"
}
```

---

## Keeping Registry in Sync

**Critical**: Registry must exactly match component props.

1. Optional props in component → `"prop?"` in schema
2. Default values in component → `(default: 'value')` in schema
3. All prop types must match TypeScript interface
