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
import { FreeSplitLogo } from './FreeSplitLogo';

interface TopAppBarProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title = 'FREESPLIT',
  subtitle = 'FINANCIAL // SYSTEM',
  showLogo = true,
  onNotificationPress,
  onProfilePress,
  style,
}) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.leftSection}>
        {showLogo && <FreeSplitLogo size={28} style={styles.logo} />}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          onPress={onNotificationPress}
          activeOpacity={0.7}
          style={styles.iconButton}
        >
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onProfilePress}
          activeOpacity={0.7}
          style={styles.avatarButton}
        >
          <Text style={styles.avatarText}>A</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginRight: 10,
  },
  title: {
    fontFamily: Typography.family.display,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: Typography.family.mono,
    fontSize: 8,
    letterSpacing: 1.2,
    color: Colors.cyan,
    marginTop: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0, 217, 255, 0.08)',
    borderColor: 'rgba(0, 217, 255, 0.25)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    fontSize: 14,
  },
  avatarButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(124, 60, 255, 0.15)',
    borderColor: 'rgba(0, 217, 255, 0.4)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: Typography.family.display,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.cyan,
  },
});
