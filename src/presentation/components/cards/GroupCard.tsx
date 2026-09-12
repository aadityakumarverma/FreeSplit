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
import { HudCard } from '../common/HudCard';

interface GroupCardProps {
  name: string;
  members: number;
  total: string;
  active?: boolean;
  memberInitials?: string[];
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const AVATAR_COLORS = [
  Colors.cyan,
  Colors.purple,
  Colors.green,
  Colors.amber,
  Colors.danger,
];

export const GroupCard: React.FC<GroupCardProps> = ({
  name,
  members,
  total,
  active = false,
  memberInitials = ['A', 'P', 'R', 'S', 'M'],
  onPress,
  style,
}) => {
  const displayAvatars = memberInitials.slice(0, Math.min(members, 5));

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.75}
      style={[styles.wrapper, style]}
    >
      <HudCard
        elevated
        highlightLine={active}
        style={[styles.card, active && styles.activeCard]}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.members}>
              {members < 10 ? `0${members}` : members} MEMBERS
            </Text>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.total}>{total}</Text>
            <Text style={styles.totalLabel}>TOTAL</Text>
          </View>
        </View>

        <View style={styles.avatarStack}>
          {displayAvatars.map((initial, i) => {
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
            return (
              <View
                key={i}
                style={[
                  styles.avatar,
                  i > 0 && styles.overlapAvatar,
                  {
                    borderColor: `${color}40`,
                    backgroundColor: `${color}15`,
                    zIndex: 10 - i,
                  },
                ]}
              >
                <Text style={[styles.avatarText, { color }]}>{initial}</Text>
              </View>
            );
          })}
        </View>
      </HudCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 6,
    width: '100%',
  },
  card: {
    padding: 16,
  },
  activeCard: {
    borderColor: 'rgba(0, 217, 255, 0.4)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontFamily: Typography.family.mono,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  members: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  total: {
    fontFamily: Typography.family.mono,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.cyan,
  },
  totalLabel: {
    fontFamily: Typography.family.mono,
    fontSize: 8,
    letterSpacing: 1,
    color: Colors.textMuted,
    marginTop: 2,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlapAvatar: {
    marginLeft: -8,
  },
  avatarText: {
    fontFamily: Typography.family.display,
    fontSize: 10,
    fontWeight: '700',
  },
});
