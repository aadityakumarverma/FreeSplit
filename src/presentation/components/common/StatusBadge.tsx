import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors } from '../../../theme/Colors';
import { Typography } from '../../../theme/Typography';

export type StatusType = 'online' | 'synced' | 'pending' | 'error' | 'success' | 'optimized';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const statusConfig: Record<StatusType, { color: string; defaultLabel: string; dot: string }> = {
  online: { color: Colors.green, defaultLabel: 'ONLINE', dot: '●' },
  synced: { color: Colors.cyan, defaultLabel: 'SYNCED', dot: '●' },
  pending: { color: Colors.amber, defaultLabel: 'PENDING', dot: '◌' },
  error: { color: Colors.danger, defaultLabel: 'ERROR', dot: '●' },
  success: { color: Colors.green, defaultLabel: 'SUCCESS', dot: '●' },
  optimized: { color: Colors.green, defaultLabel: 'OPTIMIZED', dot: '●' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  style,
}) => {
  const config = statusConfig[status];
  const displayLabel = label || config.defaultLabel;

  return (
    <View
      style={[
        styles.badge,
        {
          borderColor: `${config.color}40`,
          backgroundColor: `${config.color}10`,
        },
        style,
      ]}
    >
      <Text style={[styles.dot, { color: config.color }]}>{config.dot}</Text>
      <Text style={[styles.label, { color: config.color }]}>
        {displayLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    fontSize: 7,
    marginRight: 4,
  },
  label: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1.2,
    fontWeight: '600',
  },
});
