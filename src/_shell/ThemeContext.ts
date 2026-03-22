/**
 * ThemeContext — DO NOT EDIT
 *
 * Provides dark-mode-aware semantic colors to flow screens.
 * Use the `useScreenColors()` hook in your flow screens instead
 * of importing `Colors` directly from tokens.
 */

import { createContext, useContext } from 'react';
import { Palette } from '../tokens/index';

// ─── Light colors (mirrors tokens/index.ts Colors) ────────────────────────────

export const lightColors = {
  brandPrimary:   Palette.primary600,
  brandSecondary: Palette.primary400,

  bgBase:         Palette.neutral0,
  bgSubtle:       Palette.neutral50,
  bgMuted:        Palette.neutral100,
  bgInverse:      Palette.neutral900,

  surfaceDefault: Palette.neutral0,
  surfaceRaised:  Palette.neutral50,
  surfaceOverlay: Palette.neutral100,

  textPrimary:    Palette.neutral900,
  textSecondary:  Palette.neutral600,
  textDisabled:   Palette.neutral400,
  textInverse:    Palette.neutral0,
  textLink:       Palette.primary600,

  borderDefault:  Palette.neutral200,
  borderStrong:   Palette.neutral400,
  borderFocus:    Palette.primary500,

  statusSuccess:  Palette.success500,
  statusWarning:  Palette.warning500,
  statusError:    Palette.error500,
  statusInfo:     Palette.info500,
};

// ─── Dark colors ──────────────────────────────────────────────────────────────

export const darkColors: typeof lightColors = {
  brandPrimary:   Palette.primary400,
  brandSecondary: Palette.primary300,

  bgBase:         Palette.neutral900,
  bgSubtle:       Palette.neutral800,
  bgMuted:        Palette.neutral700,
  bgInverse:      Palette.neutral0,

  surfaceDefault: Palette.neutral800,
  surfaceRaised:  Palette.neutral700,
  surfaceOverlay: Palette.neutral600,

  textPrimary:    Palette.neutral0,
  textSecondary:  Palette.neutral400,
  textDisabled:   Palette.neutral600,
  textInverse:    Palette.neutral900,
  textLink:       Palette.primary400,

  borderDefault:  '#2D3748',
  borderStrong:   Palette.neutral600,
  borderFocus:    Palette.primary400,

  statusSuccess:  Palette.success500,
  statusWarning:  Palette.warning500,
  statusError:    Palette.error500,
  statusInfo:     Palette.info500,
};

// ─── Context ──────────────────────────────────────────────────────────────────

export type ScreenColors = typeof lightColors;

export const PlaygroundThemeContext = createContext<{
  isDark: boolean;
  colors: ScreenColors;
}>({ isDark: false, colors: lightColors });

/**
 * Use this hook in your flow screens to get dark-mode-aware colors.
 *
 * @example
 * const { colors } = useScreenColors();
 * <View style={{ backgroundColor: colors.bgBase }}>
 */
export const useScreenColors = () => useContext(PlaygroundThemeContext);
