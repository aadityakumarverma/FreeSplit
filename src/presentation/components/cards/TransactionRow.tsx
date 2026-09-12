import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Colors } from '../../../theme/Colors';
import { Typography } from '../../../theme/Typography';

export type TransactionDirection = 'owe' | 'owed';

interface TransactionRowProps {
  name: string;
  amount: string;
  direction: TransactionDirection;
  date: string;
  avatar: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  name,
  amount,
  direction,
  date,
  avatar,
  onPress,
  style,
}) => {
  const isOwed = direction === 'owed';
  const color = isOwed ? Colors.green : Colors.amber;
  const prefix = isOwed ? '+' : '-';

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{avatar}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Text style={[styles.amount, { color }]}>
        {prefix}{amount}
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 217, 255, 0.12)',
    borderColor: 'rgba(0, 217, 255, 0.3)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontFamily: Typography.family.display,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.cyan,
  },
  details: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontFamily: Typography.family.body,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  date: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  amount: {
    fontFamily: Typography.family.mono,
    fontSize: 15,
    fontWeight: '700',
  },
});
