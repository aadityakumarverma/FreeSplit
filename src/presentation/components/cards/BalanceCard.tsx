import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors } from '../../../theme/Colors';
import { Typography } from '../../../theme/Typography';

export type BalanceVariant = 'positive' | 'negative' | 'neutral';

interface BalanceCardProps {
  amount: string;
  label: string;
  variant?: BalanceVariant;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  amount,
  label,
  variant = 'neutral',
  subtitle,
  style,
}) => {
  const color =
    variant === 'positive'
      ? Colors.green
      : variant === 'negative'
      ? Colors.danger
      : Colors.cyan;

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: `${color}30`,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.amount, { color }]}>{amount}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardElevated,
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    zIndex: 1,
  },
  label: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1.5,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  amount: {
    fontFamily: Typography.family.mono,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: Typography.family.body,
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
