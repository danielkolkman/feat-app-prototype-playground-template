import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { InputField } from '../../components/index';
import { Spacing } from '../../tokens';
import { useScreenColors } from '../../_shell/ThemeContext';

export const SignUpScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { colors } = useScreenColors();

  return (
    <View style={[styles.root, { backgroundColor: colors.bgBase }]}>
      <View style={styles.body}>
        <Typography variant="heading-xl">Create account</Typography>
        <Typography variant="body-md" color="textSecondary" style={{ marginTop: Spacing[1], marginBottom: Spacing[6] }}>
          Fill in your details to get started.
        </Typography>
        <View style={{ gap: Spacing[4] }}>
          <InputField label="Full name" placeholder="Jane Smith" value={name} onChangeText={setName} />
          <InputField label="Email" placeholder="jane@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>
      </View>
      <View style={{ gap: Spacing[3] }}>
        <Button label="Continue" fullWidth />
        <Button label="Back" variant="ghost" fullWidth onPress={() => navigation.goBack()} />
      </View>
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
