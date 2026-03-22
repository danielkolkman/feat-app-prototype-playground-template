import React, { useState } from 'react';
import {
  ScrollView, View, SafeAreaView, StyleSheet, StatusBar,
} from 'react-native';
import { Colors, Spacing, Radius } from '../tokens';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { Card, Badge, InputField, Avatar, Divider } from '../components/index';

export const HomeScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName]   = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgBase} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.section}>
          <Typography variant="overline" color="textSecondary">Design System</Typography>
          <Typography variant="display-md">Component Library</Typography>
          <Typography variant="body-md" color="textSecondary" style={{ marginTop: Spacing[1] }}>
            Prototype built from Figma design tokens.
          </Typography>
        </View>

        <Divider />

        {/* Buttons */}
        <View style={styles.section}>
          <Typography variant="heading-md">Buttons</Typography>
          <View style={styles.row}>
            <Button label="Primary" variant="primary" />
            <Button label="Secondary" variant="secondary" />
          </View>
          <View style={styles.row}>
            <Button label="Outline" variant="outline" />
            <Button label="Ghost" variant="ghost" />
          </View>
          <View style={styles.row}>
            <Button label="Destructive" variant="destructive" />
            <Button label="Loading…" loading />
          </View>
          <View style={styles.row}>
            <Button label="Small" size="sm" />
            <Button label="Medium" size="md" />
            <Button label="Large" size="lg" />
          </View>
          <Button label="Full Width Button" fullWidth />
        </View>

        <Divider />

        {/* Badges */}
        <View style={styles.section}>
          <Typography variant="heading-md">Badges</Typography>
          <View style={styles.row}>
            <Badge label="Default" />
            <Badge label="Success" variant="success" showDot />
            <Badge label="Warning" variant="warning" showDot />
          </View>
          <View style={styles.row}>
            <Badge label="Error" variant="error" showDot />
            <Badge label="Info" variant="info" showDot />
          </View>
        </View>

        <Divider />

        {/* Typography */}
        <View style={styles.section}>
          <Typography variant="heading-md">Typography</Typography>
          <Typography variant="display-md">Display MD</Typography>
          <Typography variant="heading-xl">Heading XL</Typography>
          <Typography variant="heading-lg">Heading LG</Typography>
          <Typography variant="body-lg">Body LG — The quick brown fox</Typography>
          <Typography variant="body-md" color="textSecondary">Body MD secondary — Jumps over the lazy dog</Typography>
          <Typography variant="label-md">Label MD</Typography>
          <Typography variant="caption" color="textDisabled">Caption text</Typography>
          <Typography variant="overline" color="textSecondary">Overline Text</Typography>
        </View>

        <Divider />

        {/* Avatars */}
        <View style={styles.section}>
          <Typography variant="heading-md">Avatars</Typography>
          <View style={[styles.row, { alignItems: 'flex-end' }]}>
            <Avatar size="xs" initials="XS" />
            <Avatar size="sm" initials="SM" color="#8B5CF6" />
            <Avatar size="md" initials="MD" color="#EC4899" />
            <Avatar size="lg" initials="LG" color="#14B8A6" />
            <Avatar size="xl" initials="XL" color="#F59E0B" />
          </View>
        </View>

        <Divider />

        {/* Form inputs */}
        <View style={styles.section}>
          <Typography variant="heading-md">Form Inputs</Typography>
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

        <Divider />

        {/* Cards */}
        <View style={styles.section}>
          <Typography variant="heading-md">Cards</Typography>
          <Card variant="default" padding="md">
            <Badge label="Default" />
            <Typography variant="heading-sm" style={{ marginTop: Spacing[2] }}>
              Elevated Card
            </Typography>
            <Typography variant="body-sm" color="textSecondary" style={{ marginTop: Spacing[1] }}>
              Uses box shadow and surface background tokens.
            </Typography>
          </Card>
          <Card variant="outlined" padding="md">
            <Badge label="Outlined" variant="info" />
            <Typography variant="heading-sm" style={{ marginTop: Spacing[2] }}>
              Outlined Card
            </Typography>
            <Typography variant="body-sm" color="textSecondary" style={{ marginTop: Spacing[1] }}>
              Defined by a 1px border using border token.
            </Typography>
          </Card>
          <Card variant="filled" padding="md">
            <Badge label="Filled" variant="success" showDot />
            <Typography variant="heading-sm" style={{ marginTop: Spacing[2] }}>
              Filled Card
            </Typography>
            <Typography variant="body-sm" color="textSecondary" style={{ marginTop: Spacing[1] }}>
              Subtle background color from bgSubtle token.
            </Typography>
          </Card>
        </View>

        <Divider label="End" />
        <View style={{ height: Spacing[12] }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bgBase,
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: Spacing[5],
    gap:     Spacing[6],
  },
  section: {
    gap: Spacing[3],
  },
  row: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    gap:           Spacing[2],
    alignItems:    'center',
  },
});
