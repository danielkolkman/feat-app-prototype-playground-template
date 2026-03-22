import React from 'react';
import {
  View, Text, TextInput, Image,
  StyleSheet, ViewStyle, TextStyle, TextInputProps,
} from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow, Palette } from '../tokens';

// ─── CARD ────────────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  style?: ViewStyle;
  radius?: 'md' | 'lg' | 'xl';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  style,
  radius = 'xl',
}) => {
  const cardStyle: ViewStyle[] = [
    styles.cardBase,
    { borderRadius: Radius[radius] },
    variant === 'default' && styles.cardDefault,
    variant === 'outlined' && styles.cardOutlined,
    variant === 'elevated' && styles.cardElevated,
    variant === 'filled' && styles.cardFilled,
    padding === 'sm' && { padding: Spacing[3] },
    padding === 'md' && { padding: Spacing[4] },
    padding === 'lg' && { padding: Spacing[6] },
    padding === 'none' && { padding: 0 },
  ].filter(Boolean) as ViewStyle[];

  return <View style={[...cardStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  cardBase: {
    backgroundColor: Colors.surfaceDefault,
    overflow: 'hidden',
  },
  cardDefault: {
    ...Shadow.md,
  },
  cardOutlined: {
    borderWidth:  1,
    borderColor:  Colors.borderDefault,
  },
  cardElevated: {
    ...Shadow.lg,
  },
  cardFilled: {
    backgroundColor: Colors.bgSubtle,
  },

  // ─── BADGE ──────────────────────────────────────────────────────────────────
  badgeBase: {
    alignSelf:      'flex-start',
    flexDirection:  'row',
    alignItems:     'center',
    paddingVertical:   Spacing[0.5],
    paddingHorizontal: Spacing[2],
    borderRadius:   Radius.full,
  },
  badgeDot: {
    width:        6,
    height:       6,
    borderRadius: 3,
    marginRight:  Spacing[1],
  },
  badgeLabel: {
    fontSize:   FontSize.xs,
    fontWeight: FontWeight.semibold as any,
  },

  // ─── INPUT ──────────────────────────────────────────────────────────────────
  inputWrapper: {
    gap: Spacing[1],
  },
  inputLabel: {
    fontSize:   FontSize.sm,
    fontWeight: FontWeight.medium as any,
    color:      Colors.textSecondary,
  },
  inputContainer: {
    flexDirection:  'row',
    alignItems:     'center',
    borderWidth:    1.5,
    borderColor:    Colors.borderDefault,
    borderRadius:   Radius.lg,
    backgroundColor: Colors.bgBase,
    paddingHorizontal: Spacing[3],
    minHeight:      48,
  },
  inputContainerFocused: {
    borderColor: Colors.borderFocus,
  },
  inputContainerError: {
    borderColor: Colors.statusError,
  },
  input: {
    flex:       1,
    fontSize:   FontSize.base,
    color:      Colors.textPrimary,
    paddingVertical: Spacing[2],
  },
  inputHint: {
    fontSize: FontSize.xs,
    color:    Colors.textSecondary,
  },
  inputError: {
    color: Colors.statusError,
  },

  // ─── AVATAR ─────────────────────────────────────────────────────────────────
  avatarBase: {
    alignItems:     'center',
    justifyContent: 'center',
    overflow:       'hidden',
  },
  avatarInitials: {
    fontWeight: FontWeight.semibold as any,
    color:      Colors.textInverse,
  },
});

// ─── BADGE ───────────────────────────────────────────────────────────────────
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

const badgeConfig: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  default: { bg: Colors.bgMuted,       text: Colors.textSecondary, dot: Colors.textSecondary },
  success: { bg: Palette.success50,    text: Palette.success700,   dot: Palette.success500 },
  warning: { bg: Palette.warning50,    text: Palette.warning700,   dot: Palette.warning500 },
  error:   { bg: Palette.error50,      text: Palette.error700,     dot: Palette.error500 },
  info:    { bg: Palette.info50,       text: Palette.info700,      dot: Palette.info500 },
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default', showDot = false }) => {
  const cfg = badgeConfig[variant];
  return (
    <View style={[styles.badgeBase, { backgroundColor: cfg.bg }]}>
      {showDot && <View style={[styles.badgeDot, { backgroundColor: cfg.dot }]} />}
      <Text style={[styles.badgeLabel, { color: cfg.text }]}>{label}</Text>
    </View>
  );
};

// ─── INPUT ───────────────────────────────────────────────────────────────────
interface InputFieldProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  hint,
  error,
  leftElement,
  rightElement,
  style,
  ...rest
}) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={styles.inputWrapper}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          focused && styles.inputContainerFocused,
          !!error && styles.inputContainerError,
        ]}
      >
        {leftElement && <View style={{ marginRight: Spacing[2] }}>{leftElement}</View>}
        <TextInput
          style={[styles.input, style as TextStyle]}
          placeholderTextColor={Colors.textDisabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {rightElement && <View style={{ marginLeft: Spacing[2] }}>{rightElement}</View>}
      </View>
      {(hint || error) && (
        <Text style={[styles.inputHint, !!error && styles.inputError]}>
          {error || hint}
        </Text>
      )}
    </View>
  );
};

// ─── AVATAR ──────────────────────────────────────────────────────────────────
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const avatarSizeMap: Record<AvatarSize, number> = {
  xs: 24, sm: 32, md: 40, lg: 56, xl: 80,
};

interface AvatarProps {
  size?: AvatarSize;
  src?: string;
  initials?: string;
  color?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  src,
  initials = 'AB',
  color = Colors.brandPrimary,
}) => {
  const dim = avatarSizeMap[size];
  const fontSize = dim * 0.38;

  return (
    <View
      style={[
        styles.avatarBase,
        { width: dim, height: dim, borderRadius: dim / 2, backgroundColor: color },
      ]}
    >
      {src ? (
        <Image source={{ uri: src }} style={{ width: dim, height: dim }} />
      ) : (
        <Text style={[styles.avatarInitials, { fontSize }]}>
          {initials.slice(0, 2).toUpperCase()}
        </Text>
      )}
    </View>
  );
};

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
interface DividerProps {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Divider: React.FC<DividerProps> = ({ label, orientation = 'horizontal' }) => {
  if (orientation === 'vertical') {
    return (
      <View style={{ width: 1, backgroundColor: Colors.borderDefault, alignSelf: 'stretch' }} />
    );
  }
  if (label) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
        <View style={{ flex: 1, height: 1, backgroundColor: Colors.borderDefault }} />
        <Text style={{ fontSize: FontSize.xs, color: Colors.textDisabled, fontWeight: FontWeight.medium as any }}>
          {label}
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: Colors.borderDefault }} />
      </View>
    );
  }
  return <View style={{ height: 1, backgroundColor: Colors.borderDefault }} />;
};
