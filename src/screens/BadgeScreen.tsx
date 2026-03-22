import React from 'react';
import { View } from 'react-native';
import { Spacing } from '../tokens';
import { Badge } from '../components/index';

export const BadgeScreen: React.FC = () => (
  <View style={{ gap: Spacing[3] }}>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] }}>
      <Badge label="Default" />
      <Badge label="Success" variant="success" showDot />
      <Badge label="Warning" variant="warning" showDot />
      <Badge label="Error" variant="error" showDot />
      <Badge label="Info" variant="info" showDot />
    </View>
  </View>
);
