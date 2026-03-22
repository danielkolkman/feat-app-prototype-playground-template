import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow, Duration } from '../tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
export type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, { container: ViewStyle; label: TextStyle }> = {
  primary: {
    container: { backgroundColor: Colors.brandPrimary, borderWidth: 0 },
    label:     { color: Colors.textInverse },
  },
  secondary: {
    container: { backgroundColor: Colors.bgMuted, borderWidth: 0 },
    label:     { color: Colors.textPrimary },
  },
  ghost: {
    container: { backgroundColor: 'transparent', borderWidth: 0 },
    label:     { color: Colors.brandPrimary },
  },
  destructive: {
    container: { backgroundColor: Colors.statusError, borderWidth: 0 },
    label:     { color: Colors.textInverse },
  },
  outline: {
    container: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.borderStrong },
    label:     { color: Colors.textPrimary },
  },
};

const sizeStyles: Record<ButtonSize, { container: ViewStyle; label: TextStyle }> = {
  sm: {
    container: { paddingVertical: Spacing[1.5], paddingHorizontal: Spacing[3], borderRadius: Radius.md },
    label:     { fontSize: FontSize.sm },
  },
  md: {
    container: { paddingVertical: Spacing[2.5], paddingHorizontal: Spacing[5], borderRadius: Radius.lg },
    label:     { fontSize: FontSize.base },
  },
  lg: {
    container: { paddingVertical: Spacing[3.5], paddingHorizontal: Spacing[7], borderRadius: Radius.xl },
    label:     { fontSize: FontSize.md },
  },
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
}) => {
  const isDisabled = disabled || loading;
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        v.container,
        s.container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        ...(!isDisabled && variant === 'primary' ? [Shadow.sm] : []),
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'destructive' ? Colors.textInverse : Colors.brandPrimary}
        />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text style={[styles.label, v.label, s.label, isDisabled && styles.labelDisabled]}>
            {label}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    alignSelf:      'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontWeight: FontWeight.semibold as any,
    letterSpacing: 0.1,
  },
  labelDisabled: {
    // handled by opacity on container
  },
  leftIcon: {
    marginRight: Spacing[1.5],
  },
  rightIcon: {
    marginLeft: Spacing[1.5],
  },
});
