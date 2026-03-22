/**
 * DefaultScreen.tsx — DO NOT EDIT
 *
 * Shown in the Screens tab when no flows have been registered yet.
 */

import React from 'react';
import { View } from 'react-native';
import { useScreenColors } from './ThemeContext';

export const DefaultScreen = () => {
  const { colors } = useScreenColors();
  return <View style={{ flex: 1, backgroundColor: colors.bgBase }} />;
};
