---
name: scaffold-component
description: Generate a new React component following project conventions
disable-model-invocation: true
---

# Scaffold Component

Generate a new component at the specified path with proper structure.

## Usage

`/scaffold-component ComponentName path/to/component`

## Process

1. **Parse Arguments**
   - First argument: Component name (PascalCase)
   - Second argument: Path relative to `src/components/`

2. **Create Component File**

   ```tsx
   "use client";

   import { cls } from "@/lib/utils";

   interface $NAMEProps {
     className?: string;
   }

   const $NAME = ({ className }: $NAMEProps) => {
     return <div className={cls("", className)}>{/* TODO: Implement */}</div>;
   };

   export default $NAME;
   ```

3. **Determine if Hook is Needed**
   - Ask user if component needs state/effects
   - If yes, create hook file at `src/hooks/{domain}/use{Name}.ts`

4. **Determine if Constants are Needed**
   - Ask user if component has static text
   - If yes, create constants file at `src/constants/{domain}/{name}.ts`

## File Naming

- Component: `ComponentName.tsx` (PascalCase)
- Hook: `useComponentName.ts` (camelCase with use prefix)
- Constants: `componentName.ts` (camelCase)

## Output

Report created files and remind user to:

1. Add necessary imports
2. Implement the component logic
3. Add to parent component/page
