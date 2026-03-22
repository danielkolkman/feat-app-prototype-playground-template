import React from 'react';
import { View } from 'react-native';
import { Spacing } from '../tokens';
import { Avatar } from '../components/index';

export const AvatarScreen: React.FC = () => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[4], alignItems: 'flex-end' }}>
    <Avatar size="xs" initials="XS" />
    <Avatar size="sm" initials="SM" color="#8B5CF6" />
    <Avatar size="md" initials="MD" color="#EC4899" />
    <Avatar size="lg" initials="LG" color="#14B8A6" />
    <Avatar size="xl" initials="XL" color="#F59E0B" />
  </View>
);
