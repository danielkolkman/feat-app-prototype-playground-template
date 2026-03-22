import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Spacing } from '../../tokens';
import { useScreenColors } from '../../_shell/ThemeContext';

export const WelcomeScreen = ({ navigation }: any) => {
  const { colors } = useScreenColors();
  return (
    <View style={[styles.root, { backgroundColor: colors.bgBase }]}>
      <View style={styles.body}>
        <Typography variant="display-md">Welcome</Typography>
        <Typography variant="body-md" color="textSecondary" style={{ marginTop: Spacing[2] }}>
          Start your journey here.
        </Typography>
      </View>
      <Button label="Get Started" fullWidth onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: Spacing[6],
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
});
