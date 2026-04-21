---
name: add-to-registry
description: Add a component to the registry system for AI tooling
disable-model-invocation: true
---

# Add to Registry

Add component to registry: $ARGUMENTS

## Process

1. **Identify component props**
   - Read the component's TypeScript interface
   - Note required vs optional props
   - Note default values

2. **Update registry.json**
   - Add full entry with constraints, propsSchema, usage example
   - Include textRules for text props (min/max chars)
   - Include do/dont guidelines

3. **Create component config**
   - Create `registry/components/[Name].json`
   - Match structure of existing component configs

4. **Create schema file**
   - Create `registry/schemas/[Name].schema.json`
   - Include name and propsSchema
   - Use `?` suffix for optional props
   - Include `(default: 'value')` for defaults

5. **Update index.json**
   - Add entry with category, intent, bestFor, avoidWhen
   - Include requires array and import path

6. **Update intents.json**
   - Add component to relevant intent arrays

7. **Verify consistency**
   - Props in schema match component interface exactly
   - Optional props marked with `?`
   - Default values documented

## Output

Report all updated registry files and confirm props match component.
