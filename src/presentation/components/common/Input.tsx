import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Colors } from '../../../theme/Colors';
import { Typography } from '../../../theme/Typography';

interface InputProps extends TextInputProps {
  label: string;
  prefix?: string;
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input: React.FC<InputProps> = ({
  label,
  prefix,
  errorMessage,
  containerStyle,
  onFocus,
  onBlur,
  editable = true,
  value,
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const hasError = Boolean(errorMessage);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          hasError && styles.error,
          !editable && styles.disabled,
        ]}
      >
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}

        <TextInput
          style={[styles.input, prefix ? styles.inputWithPrefix : undefined]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          editable={editable}
          value={value}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
      </View>

      {hasError && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1.5,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardElevated,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 46,
  },
  focused: {
    borderColor: 'rgba(0, 217, 255, 0.6)',
    shadowColor: Colors.cyan,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  error: {
    borderColor: 'rgba(255, 77, 109, 0.6)',
    shadowColor: Colors.danger,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  disabled: {
    opacity: 0.5,
  },
  prefix: {
    fontFamily: Typography.family.mono,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.cyan,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: Typography.family.body,
    fontSize: 14,
    color: Colors.textPrimary,
    paddingVertical: 10,
  },
  inputWithPrefix: {
    fontFamily: Typography.family.mono,
    fontSize: 15,
    fontWeight: '500',
  },
  errorText: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    color: Colors.danger,
    letterSpacing: 0.8,
    marginTop: 4,
  },
});
