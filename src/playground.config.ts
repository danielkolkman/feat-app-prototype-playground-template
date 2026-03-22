/**
 * playground.config.ts
 *
 * This is the only file you need to edit when using this playground
 * for a new project. Register your components and flows below.
 *
 * Steps for a new project:
 *  1. Replace src/tokens/index.ts with your design tokens
 *  2. Replace src/components/ with your React Native components
 *  3. Add component preview screens to src/screens/
 *  4. Add user flows to src/flows/
 *  5. Register everything below
 */

import { ButtonScreen }     from './screens/ButtonScreen';
import { BadgeScreen }      from './screens/BadgeScreen';
import { TypographyScreen } from './screens/TypographyScreen';
import { CardScreen }       from './screens/CardScreen';
import { InputScreen }      from './screens/InputScreen';
import { AvatarScreen }     from './screens/AvatarScreen';
import { FLOWS }            from './flows';

export const COMPONENTS = [
  { name: 'Button',     component: ButtonScreen },
  { name: 'Badge',      component: BadgeScreen },
  { name: 'Typography', component: TypographyScreen },
  { name: 'Card',       component: CardScreen },
  { name: 'Input',      component: InputScreen },
  { name: 'Avatar',     component: AvatarScreen },
];

export { FLOWS };
