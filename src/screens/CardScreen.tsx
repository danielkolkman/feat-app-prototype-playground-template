import React from 'react';
import { View } from 'react-native';
import { Spacing } from '../tokens';
import { Card, Badge } from '../components/index';
import { Typography } from '../components/Typography';

export const CardScreen: React.FC = () => (
  <View style={{ gap: Spacing[4], minWidth: 300 }}>
    <Card variant="default" padding="md">
      <Badge label="Default" />
      <Typography variant="heading-sm" style={{ marginTop: Spacing[2] }}>Elevated Card</Typography>
      <Typography variant="body-sm" color="textSecondary" style={{ marginTop: Spacing[1] }}>
        Uses box shadow and surface background tokens.
      </Typography>
    </Card>
    <Card variant="outlined" padding="md">
      <Badge label="Outlined" variant="info" />
      <Typography variant="heading-sm" style={{ marginTop: Spacing[2] }}>Outlined Card</Typography>
      <Typography variant="body-sm" color="textSecondary" style={{ marginTop: Spacing[1] }}>
        Defined by a 1px border using border token.
      </Typography>
    </Card>
    <Card variant="filled" padding="md">
      <Badge label="Filled" variant="success" showDot />
      <Typography variant="heading-sm" style={{ marginTop: Spacing[2] }}>Filled Card</Typography>
      <Typography variant="body-sm" color="textSecondary" style={{ marginTop: Spacing[1] }}>
        Subtle background color from bgSubtle token.
      </Typography>
    </Card>
  </View>
);
