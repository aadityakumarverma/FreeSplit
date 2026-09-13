import React from 'react';
import {
  View,
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
  icon?: React.ReactNode;
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
  icon,
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
    <View style={styles.innerContentRow}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
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
    </View>
  );

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.85}
        style={[styles.wrapper, style]}
      >
        <LinearGradient
          colors={disabled ? ['#1a2a38', '#1a2a38'] : (Gradients.primary as unknown as string[])}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.baseButton,
            sizeButtonStyles[size],
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
      activeOpacity={0.75}
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
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  innerContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  baseText: {
    fontFamily: Typography.family.mono,
    fontWeight: '700',
    letterSpacing: 2.2,
    textTransform: 'uppercase',
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
    height: 38,
    paddingHorizontal: 16,
  },
  default: {
    height: 48,
    paddingHorizontal: 20,
  },
  lg: {
    height: 52,
    paddingHorizontal: 24,
  },
});

const sizeTextStyles = StyleSheet.create({
  sm: {
    fontSize: 10,
  },
  default: {
    fontSize: 11,
  },
  lg: {
    fontSize: 12,
  },
});

const variantButtonStyles = StyleSheet.create({
  primary: {
    backgroundColor: 'rgba(0, 217, 255, 0.08)',
    borderColor: 'rgba(0, 217, 255, 0.45)',
    borderWidth: 1.2,
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
    color: '#00D9FF',
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
