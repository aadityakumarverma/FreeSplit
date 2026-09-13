import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '../../theme/Typography';
import { Button } from '../components/common/Button';
import { GoogleIcon } from '../components/common/GoogleIcon';
import { ParticleBackground } from '../components/common/ParticleBackground';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../data/auth/AuthContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { signInWithGoogle, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Animated Moving Particles Background */}
      <ParticleBackground nodeCount={14} />

      <View
        style={[
          styles.contentWrapper,
          {
            paddingTop: Math.max(insets.top + 10, 24),
            paddingBottom: Math.max(insets.bottom + 16, 28),
          },
        ]}
      >
        {/* Visual Graphic Area */}
        <View style={styles.visualContainer}>
          {currentStep === 0 && <ScreenOneVisual />}
          {currentStep === 1 && <ScreenTwoVisual />}
          {currentStep === 2 && <ScreenThreeVisual />}
        </View>

        {/* Text and Actions Section */}
        <View style={styles.bottomSection}>
          {/* Tech Status Label (only on Screen 1) */}
          {currentStep === 0 && (
            <View style={styles.techLabelRow}>
              <Text style={styles.cyanBullet}>●</Text>
              <Text style={styles.techLabelText}>
                FINANCIAL NETWORK INITIALIZING...
              </Text>
            </View>
          )}

          {/* Heading */}
          <Text style={styles.heading}>
            {currentStep === 0 && 'Split smarter.'}
            {currentStep === 1 && 'Know who owes whom.'}
            {currentStep === 2 && 'Settle with less effort.'}
          </Text>

          {/* Subheading */}
          <Text style={styles.subheading}>
            {currentStep === 0 &&
              'One command center for every shared expense.'}
            {currentStep === 1 &&
              'FreeSplit keeps every shared payment clear, transparent and easy to understand.'}
            {currentStep === 2 &&
              'FreeSplit optimizes group balances so fewer payments are needed.'}
          </Text>

          {/* Progress Indicators */}
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  currentStep === idx ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          {/* Action Buttons: Screen 1 & 2 use NEXT / GET STARTED; Screen 3 uses GOOGLE LOGIN */}
          {currentStep < 2 ? (
            <Button
              title={currentStep === 0 ? 'GET STARTED' : 'NEXT'}
              variant="primary"
              size="lg"
              onPress={handleNext}
              style={styles.actionButton}
            />
          ) : (
            <Button
              title="CONTINUE WITH GOOGLE"
              icon={<GoogleIcon size={18} />}
              variant="gradient"
              size="lg"
              loading={isLoading}
              onPress={handleGoogleLogin}
              style={styles.actionButton}
            />
          )}
        </View>
      </View>
    </View>
  );
};

// --- SCREEN 1: Orbital Financial Network (Matches Figma Image 1) ---
const ScreenOneVisual = () => {
  const CX = 130;
  const CY = 115;

  const satellites = [
    { label: 'Aarav', color: '#00F5A0', initial: 'A', x: 130, y: 32 },
    { label: 'Priya', color: '#7C3CFF', initial: 'P', x: 202, y: 88 },
    { label: 'Sneha', color: '#FF4D6D', initial: 'S', x: 182, y: 175 },
    { label: 'You', color: '#00D9FF', initial: 'Y', x: 78, y: 175 },
    { label: 'Rohit', color: '#FFAA00', initial: 'R', x: 58, y: 85 },
  ];

  return (
    <View style={styles.graphicBox}>
      <Svg width={260} height={230} style={StyleSheet.absoluteFill}>
        {/* Outer dashed guide circle */}
        <Circle
          cx={CX}
          cy={CY}
          r={90}
          stroke="rgba(0, 217, 255, 0.12)"
          strokeWidth={1}
          fill="none"
        />

        {/* Inner subtle guide circle */}
        <Circle
          cx={CX}
          cy={CY}
          r={55}
          stroke="rgba(0, 217, 255, 0.08)"
          strokeWidth={0.8}
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Radial dashed lines to satellites */}
        {satellites.map((s, i) => (
          <Line
            key={i}
            x1={CX}
            y1={CY}
            x2={s.x}
            y2={s.y}
            stroke="rgba(0, 217, 255, 0.22)"
            strokeWidth={0.9}
            strokeDasharray="3 3"
          />
        ))}

        {/* Faint ambient micro-nodes */}
        <Circle cx={100} cy={60} r={2} fill="#00F5A0" fillOpacity={0.6} />
        <Circle cx={220} cy={65} r={1.5} fill="#7C3CFF" fillOpacity={0.5} />
        <Circle cx={105} cy={140} r={2} fill="#00F5A0" fillOpacity={0.5} />
      </Svg>

      {/* Central Glowing Cyan Ring Core */}
      <View style={[styles.centerCoreWrapper, { left: CX - 22, top: CY - 22 }]}>
        <View style={styles.centerGlowRing}>
          <View style={styles.centerCoreDot} />
        </View>
      </View>

      {/* Satellite Node Badges */}
      {satellites.map((node, i) => (
        <View
          key={i}
          style={[
            styles.satelliteItem,
            { left: node.x - 18, top: node.y - 18 },
          ]}
        >
          <View
            style={[
              styles.satelliteCircle,
              {
                borderColor: node.color,
                backgroundColor: `${node.color}15`,
              },
            ]}
          >
            <Text style={[styles.satelliteInitialText, { color: node.color }]}>
              {node.initial}
            </Text>
          </View>
          <Text style={styles.satelliteLabelText}>{node.label}</Text>
        </View>
      ))}
    </View>
  );
};

// --- SCREEN 2: Balance Flows ---
const ScreenTwoVisual = () => {
  const flows = [
    { from: 'Aarav', to: 'Priya', amount: '₹1,200', fromColor: '#00D9FF', toColor: '#7C3CFF' },
    { from: 'You', to: 'Aarav', amount: '₹850', fromColor: '#00F5A0', toColor: '#00D9FF' },
    { from: 'Rohit', to: 'You', amount: '₹1,000', fromColor: '#FFAA00', toColor: '#00F5A0' },
  ];

  return (
    <View style={styles.flowListBox}>
      {flows.map(({ from, to, amount, fromColor, toColor }, i) => (
        <View key={i} style={styles.flowCard}>
          <View
            style={[
              styles.flowAvatar,
              { borderColor: fromColor, backgroundColor: `${fromColor}15` },
            ]}
          >
            <Text style={[styles.flowAvatarText, { color: fromColor }]}>
              {from[0]}
            </Text>
          </View>

          <View style={styles.flowCenter}>
            <Text style={styles.flowNames}>
              {from} <Text style={styles.flowArrow}>→</Text> {to}
            </Text>
          </View>

          <Text style={styles.flowAmount}>{amount}</Text>

          <View
            style={[
              styles.flowAvatar,
              { borderColor: toColor, backgroundColor: `${toColor}15` },
            ]}
          >
            <Text style={[styles.flowAvatarText, { color: toColor }]}>
              {to[0]}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// --- SCREEN 3: Settlement Engine Comparison (Matches Image 1 Reference) ---
const ScreenThreeVisual = () => {
  return (
    <View style={styles.settlementContainer}>
      {/* BEFORE Box */}
      <View style={styles.beforeCard}>
        <Text style={styles.beforeLabel}>BEFORE</Text>
        <Text style={styles.transactionCountText}>4  TRANSACTIONS</Text>
        <View style={styles.barsRow}>
          {[0, 1, 2, 3].map((idx) => (
            <View key={idx} style={styles.redBarSegment} />
          ))}
        </View>
      </View>

      {/* Intermediate Flow Connector */}
      <View style={styles.connectorSection}>
        <View style={styles.connectorLineTop} />

        <View style={styles.settlementPill}>
          <Text style={styles.settlementPillDot}>●</Text>
          <Text style={styles.settlementPillText}>SETTLEMENT ENGINE</Text>
          <Text style={styles.settlementPillDot}>●</Text>
        </View>

        <View style={styles.connectorLineMid} />
        <Text style={styles.connectorArrow}>↓</Text>
        <View style={styles.connectorLineBottom} />
      </View>

      {/* AFTER Box */}
      <View style={styles.afterCard}>
        <Text style={styles.afterLabel}>AFTER</Text>
        <Text style={styles.transactionCountText}>2  TRANSACTIONS</Text>
        <View style={styles.barsRow}>
          <View style={styles.greenBarSegment} />
          <View style={styles.greenBarSegment} />
          <View style={styles.fadedBarSegment} />
          <View style={styles.fadedBarSegment} />
        </View>
      </View>

      {/* Bottom Status Pill */}
      <View style={styles.optimizedPill}>
        <Text style={styles.optimizedDot}>●</Text>
        <Text style={styles.optimizedText}>SETTLEMENT ENGINE  ●  OPTIMIZED</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02060B',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  visualContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomSection: {
    paddingBottom: 4,
  },
  techLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cyanBullet: {
    color: '#00D9FF',
    fontSize: 8,
    marginRight: 6,
  },
  techLabelText: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1.8,
    color: '#00D9FF',
    fontWeight: '600',
  },
  heading: {
    fontFamily: Typography.family.display,
    fontSize: 34,
    fontWeight: '700',
    color: '#F4F8FC',
    letterSpacing: 0.2,
    marginBottom: 8,
    lineHeight: 40,
  },
  subheading: {
    fontFamily: Typography.family.body,
    fontSize: 14,
    color: '#8A98A8',
    lineHeight: 20,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    height: 3.5,
    borderRadius: 2,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#00D9FF',
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(18, 48, 67, 0.9)',
  },
  actionButton: {
    marginBottom: 4,
  },

  // Screen 1 styles
  graphicBox: {
    width: 260,
    height: 230,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCoreWrapper: {
    position: 'absolute',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerGlowRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#00D9FF',
    backgroundColor: 'rgba(0, 217, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCoreDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#00D9FF',
  },
  satelliteItem: {
    position: 'absolute',
    alignItems: 'center',
    width: 36,
  },
  satelliteCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  satelliteInitialText: {
    fontFamily: Typography.family.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  satelliteLabelText: {
    fontFamily: Typography.family.body,
    fontSize: 9,
    color: '#8A98A8',
    marginTop: 3,
    textAlign: 'center',
  },

  // Screen 2 styles
  flowListBox: {
    width: '100%',
    gap: 12,
  },
  flowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#07111C',
    borderColor: '#123043',
    borderWidth: 1,
    borderRadius: 12,
    gap: 10,
  },
  flowAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowAvatarText: {
    fontFamily: Typography.family.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  flowCenter: {
    flex: 1,
  },
  flowNames: {
    fontFamily: Typography.family.body,
    fontSize: 12,
    fontWeight: '600',
    color: '#F4F8FC',
  },
  flowArrow: {
    color: '#526273',
  },
  flowAmount: {
    fontFamily: Typography.family.mono,
    fontSize: 14,
    fontWeight: '700',
    color: '#00D9FF',
  },

  // Screen 3: Settlement Engine styles (exact Image 1 match)
  settlementContainer: {
    width: '100%',
    alignItems: 'center',
  },
  beforeCard: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#07111C',
    borderColor: 'rgba(255, 77, 109, 0.28)',
    borderWidth: 1,
    borderRadius: 14,
  },
  beforeLabel: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#FF4D6D',
    fontWeight: '700',
    marginBottom: 4,
  },
  transactionCountText: {
    fontFamily: Typography.family.mono,
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  barsRow: {
    flexDirection: 'row',
    gap: 5,
  },
  redBarSegment: {
    flex: 1,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 77, 109, 0.7)',
  },
  connectorSection: {
    alignItems: 'center',
    marginVertical: 4,
  },
  connectorLineTop: {
    width: 1,
    height: 14,
    backgroundColor: 'rgba(0, 217, 255, 0.25)',
  },
  settlementPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderColor: 'rgba(124, 60, 255, 0.45)',
    borderWidth: 1,
    backgroundColor: 'rgba(124, 60, 255, 0.12)',
  },
  settlementPillDot: {
    fontSize: 6,
    color: '#7C3CFF',
  },
  settlementPillText: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1.5,
    color: '#7C3CFF',
    fontWeight: '700',
  },
  connectorLineMid: {
    width: 1,
    height: 10,
    backgroundColor: 'rgba(0, 217, 255, 0.25)',
  },
  connectorArrow: {
    color: 'rgba(0, 217, 255, 0.6)',
    fontSize: 13,
    lineHeight: 14,
  },
  connectorLineBottom: {
    width: 1,
    height: 10,
    backgroundColor: 'rgba(0, 217, 255, 0.25)',
  },
  afterCard: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#07111C',
    borderColor: 'rgba(0, 245, 160, 0.35)',
    borderWidth: 1,
    borderRadius: 14,
  },
  afterLabel: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#00F5A0',
    fontWeight: '700',
    marginBottom: 4,
  },
  greenBarSegment: {
    flex: 1,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: '#00F5A0',
  },
  fadedBarSegment: {
    flex: 1,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: 'rgba(18, 48, 67, 0.55)',
  },
  optimizedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderColor: 'rgba(0, 245, 160, 0.4)',
    borderWidth: 1,
    backgroundColor: 'rgba(0, 245, 160, 0.08)',
    marginTop: 14,
  },
  optimizedDot: {
    fontSize: 6,
    color: '#00F5A0',
  },
  optimizedText: {
    fontFamily: Typography.family.mono,
    fontSize: 8.5,
    letterSpacing: 1.4,
    color: '#00F5A0',
    fontWeight: '700',
  },
});
