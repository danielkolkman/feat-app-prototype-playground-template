import React from 'react';
import { View } from 'react-native';
import { Spacing } from '../tokens';
import { Button } from '../components/Button';

export const ButtonScreen: React.FC = () => (
  <View style={{ gap: Spacing[3] }}>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] }}>
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Outline" variant="outline" />
      <Button label="Ghost" variant="ghost" />
      <Button label="Destructive" variant="destructive" />
      <Button label="Loading…" loading />
    </View>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2], alignItems: 'center' }}>
      <Button label="Small" size="sm" />
      <Button label="Medium" size="md" />
      <Button label="Large" size="lg" />
    </View>
    <Button label="Full Width" fullWidth />
  </View>
);
