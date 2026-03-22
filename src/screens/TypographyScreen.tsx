import React from 'react';
import { View } from 'react-native';
import { Spacing } from '../tokens';
import { Typography } from '../components/Typography';

export const TypographyScreen: React.FC = () => (
  <View style={{ gap: Spacing[3] }}>
    <Typography variant="display-md">Display MD</Typography>
    <Typography variant="heading-xl">Heading XL</Typography>
    <Typography variant="heading-lg">Heading LG</Typography>
    <Typography variant="heading-md">Heading MD</Typography>
    <Typography variant="heading-sm">Heading SM</Typography>
    <Typography variant="body-lg">Body LG — The quick brown fox</Typography>
    <Typography variant="body-md" color="textSecondary">Body MD — Jumps over the lazy dog</Typography>
    <Typography variant="body-sm" color="textSecondary">Body SM — The quick brown fox</Typography>
    <Typography variant="label-md">Label MD</Typography>
    <Typography variant="caption" color="textDisabled">Caption text</Typography>
    <Typography variant="overline" color="textSecondary">Overline Text</Typography>
  </View>
);
