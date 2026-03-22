/**
 * src/playground.config.ts
 *
 * Register your components and flows here.
 * This is the only file you need to edit to wire up the playground.
 *
 * Steps:
 *  1. Replace src/tokens/index.ts with your design tokens
 *  2. Add your React Native components to src/components/
 *  3. Create a preview screen per component in src/screens/
 *  4. Add app flows to src/flows/ and register them in src/flows/index.ts
 *  5. Import and register everything below
 *
 * See examples/ for a full reference implementation.
 */

import type React from 'react';
import { FLOWS } from './flows';

// ✏️  Import your component preview screens here, e.g.:
// import { ButtonScreen } from './screens/ButtonScreen';

export const COMPONENTS: { name: string; component: React.ComponentType }[] = [
  // ✏️  Register your components here, e.g.:
  // { name: 'Button', component: ButtonScreen },
];

export { FLOWS };
