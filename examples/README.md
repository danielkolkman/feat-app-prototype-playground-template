# Examples

This folder contains a complete reference implementation of the playground — ready-made tokens, components, screens, and a flow you can use as a starting point.

## Structure

```
examples/
  tokens/index.ts          ← full design token set (colors, spacing, type, etc.)
  components/              ← Button, Typography, Card, Badge, InputField, Avatar, Divider
  screens/                 ← component preview screens for each component above
  flows/OnboardingFlow/    ← a two-screen onboarding flow with navigation
  playground.config.ts     ← wires everything up
```

## How to use

Copy the files you need into `src/` and update `src/playground.config.ts` to register them.

For example, to use the Button component:

1. Copy `examples/components/Button.tsx` → `src/components/Button.tsx`
2. Copy `examples/screens/ButtonScreen.tsx` → `src/screens/ButtonScreen.tsx`
3. In `src/playground.config.ts`:
   ```ts
   import { ButtonScreen } from './screens/ButtonScreen';
   export const COMPONENTS = [
     { name: 'Button', component: ButtonScreen },
   ];
   ```

To use the Onboarding flow:

1. Copy `examples/flows/OnboardingFlow/` → `src/flows/OnboardingFlow/`
2. In `src/flows/index.ts`:
   ```ts
   import { OnboardingFlow } from './OnboardingFlow';
   export const FLOWS = [
     { name: 'Onboarding', component: OnboardingFlow },
   ];
   ```

## Note on dark mode in flows

Flow screens use `useScreenColors()` from `src/_shell/ThemeContext` to get dark-mode-aware colors. The import path `../../_shell/ThemeContext` assumes the screen file lives in `src/flows/YourFlow/`. Keep that path when copying.
