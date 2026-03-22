import React, { useState } from 'react';
import { View } from 'react-native';
import { Spacing } from '../tokens';
import { InputField } from '../components/index';

export const InputScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={{ gap: Spacing[4], minWidth: 300 }}>
      <InputField
        label="Full name"
        placeholder="Jane Smith"
        value={name}
        onChangeText={setName}
        hint="Your display name"
      />
      <InputField
        label="Email address"
        placeholder="jane@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputField
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        error="Password must be at least 8 characters"
      />
    </View>
  );
};
