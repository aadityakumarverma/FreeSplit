import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/Colors';
import { Typography } from '../../theme/Typography';
import { FreeSplitLogo } from '../components/common/FreeSplitLogo';
import { ParticleBackground } from '../components/common/ParticleBackground';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cover'>;

export const CoverScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Animated loader dots
  const dot1Anim = useRef(new Animated.Value(0.3)).current;
  const dot2Anim = useRef(new Animated.Value(0.3)).current;
  const dot3Anim = useRef(new Animated.Value(0.3)).current;

  // Staggered pulsing loader loop
  useEffect(() => {
    const createDotAnimation = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.25,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.delay(Math.max(0, 800 - delay)),
        ]),
      );
    };

    const anim1 = createDotAnimation(dot1Anim, 0);
    const anim2 = createDotAnimation(dot2Anim, 250);
    const anim3 = createDotAnimation(dot3Anim, 500);

    anim1.start();
    anim2.start();
    anim3.start();

    // Auto-navigate to Onboarding after loader completes initial cycle
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 2500);

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
      clearTimeout(timer);
    };
  }, [dot1Anim, dot2Anim, dot3Anim, navigation]);

  const handlePress = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      style={styles.container}
    >
      {/* Animated Moving Particles Background */}
      <ParticleBackground nodeCount={14} maxDistance={110} />

      <View style={styles.centerContent}>
        {/* FreeSplit Connected Logo */}
        <FreeSplitLogo size={70} showGlow style={styles.logo} />

        {/* FreeSplit Wordmark */}
        <Text style={styles.brandTitle}>
          FREE<Text style={styles.brandAccent}>SPLIT</Text>
        </Text>

        {/* Tagline */}
        <Text style={styles.tagline}>
          SPLIT SMARTER. SETTLE SIMPLER.
        </Text>

        {/* Technical Specification Box */}
        <View style={styles.techBox}>
          <Text style={styles.techTitle}>FINANCIAL INTELLIGENCE SYSTEM</Text>
          <Text style={styles.techVersion}>VERSION 01.0</Text>
        </View>

        {/* Three Horizontal Animated Loader Dots (Cyan, Purple, Green) */}
        <View style={styles.loaderRow}>
          <Animated.View
            style={[
              styles.loaderDot,
              styles.dotCyan,
              {
                opacity: dot1Anim,
                transform: [
                  {
                    scale: dot1Anim.interpolate({
                      inputRange: [0.25, 1],
                      outputRange: [0.8, 1.3],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.loaderDot,
              styles.dotPurple,
              {
                opacity: dot2Anim,
                transform: [
                  {
                    scale: dot2Anim.interpolate({
                      inputRange: [0.25, 1],
                      outputRange: [0.8, 1.3],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.loaderDot,
              styles.dotGreen,
              {
                opacity: dot3Anim,
                transform: [
                  {
                    scale: dot3Anim.interpolate({
                      inputRange: [0.25, 1],
                      outputRange: [0.8, 1.3],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02060B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  logo: {
    marginBottom: 28,
  },
  brandTitle: {
    fontFamily: Typography.family.display,
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    lineHeight: 52,
    textAlign: 'center',
    marginBottom: 14,
  },
  brandAccent: {
    color: Colors.cyan,
  },
  tagline: {
    fontFamily: Typography.family.mono,
    fontSize: 11,
    color: '#8A98A8',
    letterSpacing: 3.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 28,
  },
  techBox: {
    borderColor: 'rgba(0, 217, 255, 0.22)',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: 'rgba(7, 17, 28, 0.85)',
    alignItems: 'center',
    marginBottom: 36,
  },
  techTitle: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.cyan,
    fontWeight: '600',
  },
  techVersion: {
    fontFamily: Typography.family.mono,
    fontSize: 8,
    letterSpacing: 1.5,
    color: '#526273',
    marginTop: 4,
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 20,
  },
  loaderDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  dotCyan: {
    backgroundColor: '#00D9FF',
  },
  dotPurple: {
    backgroundColor: '#7C3CFF',
  },
  dotGreen: {
    backgroundColor: '#00F5A0',
  },
});
