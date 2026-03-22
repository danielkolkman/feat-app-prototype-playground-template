/**
 * Design System Tokens
 * Source: Figma Design System — node 9762-187
 * Update values below with your exact Figma variable values.
 */

// ─── COLOR PRIMITIVES ──────────────────────────────────────────────────────
export const Palette = {
  // Primary
  primary50:  '#EEF2FF',
  primary100: '#E0E7FF',
  primary200: '#C7D2FE',
  primary300: '#A5B4FC',
  primary400: '#818CF8',
  primary500: '#6366F1',
  primary600: '#4F46E5',
  primary700: '#4338CA',
  primary800: '#3730A3',
  primary900: '#312E81',

  // Neutral
  neutral0:   '#FFFFFF',
  neutral50:  '#F8FAFC',
  neutral100: '#F1F5F9',
  neutral200: '#E2E8F0',
  neutral300: '#CBD5E1',
  neutral400: '#94A3B8',
  neutral500: '#64748B',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1E293B',
  neutral900: '#0F172A',

  // Semantic
  success50:  '#F0FDF4',
  success500: '#22C55E',
  success700: '#15803D',

  warning50:  '#FFFBEB',
  warning500: '#F59E0B',
  warning700: '#B45309',

  error50:    '#FEF2F2',
  error500:   '#EF4444',
  error700:   '#B91C1C',

  info50:     '#EFF6FF',
  info500:    '#3B82F6',
  info700:    '#1D4ED8',
} as const;

// ─── SEMANTIC COLOR TOKENS ──────────────────────────────────────────────────
export const Colors = {
  // Brand
  brandPrimary:   Palette.primary600,
  brandSecondary: Palette.primary400,

  // Background
  bgBase:         Palette.neutral0,
  bgSubtle:       Palette.neutral50,
  bgMuted:        Palette.neutral100,
  bgInverse:      Palette.neutral900,

  // Surface
  surfaceDefault: Palette.neutral0,
  surfaceRaised:  Palette.neutral50,
  surfaceOverlay: Palette.neutral100,

  // Text
  textPrimary:    Palette.neutral900,
  textSecondary:  Palette.neutral600,
  textDisabled:   Palette.neutral400,
  textInverse:    Palette.neutral0,
  textLink:       Palette.primary600,

  // Border
  borderDefault:  Palette.neutral200,
  borderStrong:   Palette.neutral400,
  borderFocus:    Palette.primary500,

  // Status
  statusSuccess:  Palette.success500,
  statusWarning:  Palette.warning500,
  statusError:    Palette.error500,
  statusInfo:     Palette.info500,
} as const;

// ─── TYPOGRAPHY ─────────────────────────────────────────────────────────────
export const FontFamily = {
  sans:       'Inter',
  display:    'Inter',
  mono:       'JetBrains Mono',
} as const;

export const FontSize = {
  xs:   10,
  sm:   12,
  base: 14,
  md:   16,
  lg:   18,
  xl:   20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
} as const;

export const FontWeight = {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
  black:    '900',
} as const;

export const LineHeight = {
  tight:   1.2,
  snug:    1.375,
  normal:  1.5,
  relaxed: 1.625,
} as const;

export const LetterSpacing = {
  tight:  -0.5,
  normal:  0,
  wide:    0.5,
  wider:   1,
} as const;

// ─── SPACING ────────────────────────────────────────────────────────────────
export const Spacing = {
  0:   0,
  0.5: 2,
  1:   4,
  1.5: 6,
  2:   8,
  2.5: 10,
  3:   12,
  3.5: 14,
  4:   16,
  5:   20,
  6:   24,
  7:   28,
  8:   32,
  9:   36,
  10:  40,
  12:  48,
  14:  56,
  16:  64,
  20:  80,
  24:  96,
} as const;

// ─── BORDER RADIUS ──────────────────────────────────────────────────────────
export const Radius = {
  none:  0,
  xs:    2,
  sm:    4,
  md:    6,
  lg:    8,
  xl:    12,
  '2xl': 16,
  '3xl': 24,
  full:  9999,
} as const;

// ─── SHADOWS ────────────────────────────────────────────────────────────────
export const Shadow = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: Palette.neutral900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: Palette.neutral900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: Palette.neutral900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  xl: {
    shadowColor: Palette.neutral900,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
  },
} as const;

// ─── ANIMATION ──────────────────────────────────────────────────────────────
export const Duration = {
  instant:  0,
  fast:     100,
  normal:   200,
  slow:     300,
  slower:   500,
} as const;

// ─── ICON SIZE ──────────────────────────────────────────────────────────────
export const IconSize = {
  xs:  12,
  sm:  16,
  md:  20,
  lg:  24,
  xl:  32,
} as const;

// ─── Z-INDEX ─────────────────────────────────────────────────────────────────
export const ZIndex = {
  base:    0,
  raised:  10,
  overlay: 100,
  modal:   200,
  toast:   300,
} as const;
