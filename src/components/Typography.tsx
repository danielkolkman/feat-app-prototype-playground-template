import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Colors, FontFamily, FontSize, FontWeight, LineHeight, LetterSpacing } from '../tokens';

export type TypographyVariant =
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'heading-xl'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'label-lg'
  | 'label-md'
  | 'label-sm'
  | 'caption'
  | 'overline'
  | 'code';

type TextColorKey = keyof typeof Colors;

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  color?: TextColorKey;
  style?: TextStyle;
  numberOfLines?: number;
  align?: 'left' | 'center' | 'right';
}

const variantStyles: Record<TypographyVariant, TextStyle> = {
  'display-xl': {
    fontSize:      FontSize['5xl'],
    fontWeight:    FontWeight.black as any,
    lineHeight:    FontSize['5xl'] * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },
  'display-lg': {
    fontSize:      FontSize['4xl'],
    fontWeight:    FontWeight.bold as any,
    lineHeight:    FontSize['4xl'] * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },
  'display-md': {
    fontSize:      FontSize['3xl'],
    fontWeight:    FontWeight.bold as any,
    lineHeight:    FontSize['3xl'] * LineHeight.snug,
  },
  'heading-xl': {
    fontSize:      FontSize['2xl'],
    fontWeight:    FontWeight.semibold as any,
    lineHeight:    FontSize['2xl'] * LineHeight.snug,
  },
  'heading-lg': {
    fontSize:      FontSize.xl,
    fontWeight:    FontWeight.semibold as any,
    lineHeight:    FontSize.xl * LineHeight.snug,
  },
  'heading-md': {
    fontSize:      FontSize.lg,
    fontWeight:    FontWeight.semibold as any,
    lineHeight:    FontSize.lg * LineHeight.snug,
  },
  'heading-sm': {
    fontSize:      FontSize.md,
    fontWeight:    FontWeight.semibold as any,
    lineHeight:    FontSize.md * LineHeight.normal,
  },
  'body-lg': {
    fontSize:   FontSize.md,
    fontWeight: FontWeight.regular as any,
    lineHeight: FontSize.md * LineHeight.relaxed,
  },
  'body-md': {
    fontSize:   FontSize.base,
    fontWeight: FontWeight.regular as any,
    lineHeight: FontSize.base * LineHeight.relaxed,
  },
  'body-sm': {
    fontSize:   FontSize.sm,
    fontWeight: FontWeight.regular as any,
    lineHeight: FontSize.sm * LineHeight.normal,
  },
  'label-lg': {
    fontSize:      FontSize.base,
    fontWeight:    FontWeight.medium as any,
    letterSpacing: LetterSpacing.normal,
  },
  'label-md': {
    fontSize:      FontSize.sm,
    fontWeight:    FontWeight.medium as any,
    letterSpacing: LetterSpacing.normal,
  },
  'label-sm': {
    fontSize:      FontSize.xs,
    fontWeight:    FontWeight.semibold as any,
    letterSpacing: LetterSpacing.wide,
  },
  'caption': {
    fontSize:   FontSize.xs,
    fontWeight: FontWeight.regular as any,
    lineHeight: FontSize.xs * LineHeight.normal,
  },
  'overline': {
    fontSize:      FontSize.xs,
    fontWeight:    FontWeight.semibold as any,
    letterSpacing: LetterSpacing.wider,
    textTransform: 'uppercase',
  },
  'code': {
    fontSize:   FontSize.sm,
    fontFamily: FontFamily.mono,
  },
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body-md',
  children,
  color = 'textPrimary',
  style,
  numberOfLines,
  align = 'left',
}) => {
  return (
    <Text
      style={[
        variantStyles[variant],
        { color: Colors[color], textAlign: align },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};
