/**
 * Example playground.config.ts
 *
 * Copy the contents of this file into src/playground.config.ts
 * and update the import paths accordingly.
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
