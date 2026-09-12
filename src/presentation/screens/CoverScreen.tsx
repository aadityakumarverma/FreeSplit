import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/Colors';
import { Typography } from '../../theme/Typography';
import { FreeSplitLogo } from '../components/common/FreeSplitLogo';
import { Button } from '../components/common/Button';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cover'>;

export const CoverScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [floatAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Top Status Indicators */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.monoMuted}>SYS.INIT / DESIGN.OS</Text>
            <Text style={styles.monoOnline}>● ONLINE</Text>
          </View>
          <View style={styles.topRight}>
            <Text style={styles.monoMuted}>BUILD 2026.09</Text>
            <Text style={styles.monoMuted}>REV 01.0</Text>
          </View>
        </View>

        {/* Center Futuristic Brand Hero */}
        <Animated.View
          style={[
            styles.centerSection,
            { transform: [{ translateY: floatAnim }] },
          ]}
        >
          <FreeSplitLogo size={80} showGlow />

          <View style={styles.wordmarkContainer}>
            <Text style={styles.brandTitle}>
              FREE<Text style={styles.brandAccent}>SPLIT</Text>
            </Text>

            <View style={styles.dividerLine} />

            <Text style={styles.brandTagline}>
              Split smarter. Settle simpler.
            </Text>
          </View>

          {/* Technical Spec Box */}
          <View style={styles.techBadge}>
            <Text style={styles.techBadgeTitle}>FINANCIAL INTELLIGENCE SYSTEM</Text>
            <Text style={styles.techBadgeSubtitle}>VERSION 01.0</Text>
          </View>
        </Animated.View>

        {/* Bottom Actions */}
        <View style={styles.bottomSection}>
          <Button
            title="ENTER SYSTEM"
            variant="gradient"
            size="lg"
            onPress={() => navigation.navigate('Onboarding')}
            style={styles.primaryButton}
          />

          <Button
            title="GO TO DASHBOARD"
            variant="ghost"
            size="default"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  topRight: {
    alignItems: 'flex-end',
  },
  monoMuted: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 1.2,
  },
  monoOnline: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    color: Colors.cyan,
    letterSpacing: 1,
    marginTop: 2,
  },
  centerSection: {
    alignItems: 'center',
    gap: 20,
  },
  wordmarkContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  brandTitle: {
    fontFamily: Typography.family.display,
    fontSize: 42,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 2.5,
  },
  brandAccent: {
    color: Colors.cyan,
  },
  dividerLine: {
    width: 220,
    height: 1.5,
    backgroundColor: 'rgba(0, 217, 255, 0.4)',
    marginVertical: 12,
  },
  brandTagline: {
    fontFamily: Typography.family.body,
    fontSize: 13,
    color: Colors.textSecondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  techBadge: {
    borderColor: 'rgba(0, 217, 255, 0.2)',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 217, 255, 0.04)',
    alignItems: 'center',
  },
  techBadgeTitle: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1.5,
    color: Colors.cyan,
  },
  techBadgeSubtitle: {
    fontFamily: Typography.family.mono,
    fontSize: 8,
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginTop: 2,
  },
  bottomSection: {
    gap: 12,
    marginBottom: 8,
  },
  primaryButton: {
    marginBottom: 4,
  },
});
