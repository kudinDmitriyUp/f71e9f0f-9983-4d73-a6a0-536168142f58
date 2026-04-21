// Social brand icons were removed in lucide-react 1.x.
// This augmentation restores type declarations so AI-generated code that
// still imports them compiles without TS2305 errors.
// At runtime resolveIcon() maps unknown string names to a fallback icon.
import type { LucideIcon } from 'lucide-react';

declare module 'lucide-react' {
  export const Linkedin: LucideIcon;
  export const Twitter: LucideIcon;
  export const Instagram: LucideIcon;
  export const Facebook: LucideIcon;
  export const Youtube: LucideIcon;
  export const Github: LucideIcon;
  export const Snapchat: LucideIcon;
  export const Pinterest: LucideIcon;
  export const Tiktok: LucideIcon;
  export const Discord: LucideIcon;
}
