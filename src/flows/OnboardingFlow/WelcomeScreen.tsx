import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Colors, Spacing } from '../../tokens';

export const WelcomeScreen = ({ navigation }: any) => (
  <View style={styles.root}>
    <View style={styles.body}>
      <Typography variant="display-md">Welcome</Typography>
      <Typography variant="body-md" color="textSecondary" style={{ marginTop: Spacing[2] }}>
        Start your journey here.
      </Typography>
    </View>
    <Button label="Get Started" fullWidth onPress={() => navigation.navigate('SignUp')} />
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bgBase,
    padding: Spacing[6],
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
});
