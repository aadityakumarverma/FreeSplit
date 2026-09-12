import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Gradients } from '../../../theme/Colors';
import { Typography } from '../../../theme/Typography';

export type ButtonVariant = 'primary' | 'gradient' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'default' | 'lg';

interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  children,
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  onPress,
  style,
  textStyle,
}) => {
  const content = children || (
    <Text
      style={[
        styles.baseText,
        sizeTextStyles[size],
        variantTextStyles[variant],
        disabled && styles.disabledText,
        textStyle,
      ]}
    >
      {title}
    </Text>
  );

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[styles.wrapper, style]}
      >
        <LinearGradient
          colors={disabled ? ['#1a2a38', '#1a2a38'] : (Gradients.primary as unknown as string[])}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.baseButton,
            sizeButtonStyles[size],
            styles.gradientShadow,
            disabled && styles.disabledButton,
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#02060B" />
          ) : (
            content
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.baseButton,
        sizeButtonStyles[size],
        variantButtonStyles[variant],
        disabled && styles.disabledButton,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.cyan : Colors.textPrimary}
        />
      ) : (
        content
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  baseButton: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  baseText: {
    fontFamily: Typography.family.mono,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  gradientShadow: {
    shadowColor: Colors.cyan,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.6,
  },
});

const sizeButtonStyles = StyleSheet.create({
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  default: {
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

const sizeTextStyles = StyleSheet.create({
  sm: {
    fontSize: 9,
  },
  default: {
    fontSize: 11,
  },
  lg: {
    fontSize: 13,
  },
});

const variantButtonStyles = StyleSheet.create({
  primary: {
    backgroundColor: 'rgba(0, 217, 255, 0.1)',
    borderColor: 'rgba(0, 217, 255, 0.4)',
    borderWidth: 1,
    shadowColor: Colors.cyan,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  gradient: {},
  secondary: {
    backgroundColor: 'rgba(124, 60, 255, 0.12)',
    borderColor: 'rgba(124, 60, 255, 0.4)',
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: Colors.border,
    borderWidth: 1,
  },
  danger: {
    backgroundColor: 'rgba(255, 77, 109, 0.1)',
    borderColor: 'rgba(255, 77, 109, 0.4)',
    borderWidth: 1,
  },
});

const variantTextStyles = StyleSheet.create({
  primary: {
    color: Colors.cyan,
  },
  gradient: {
    color: '#02060B',
  },
  secondary: {
    color: '#A77BFF',
  },
  ghost: {
    color: Colors.textSecondary,
  },
  danger: {
    color: Colors.danger,
  },
});
