import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/Colors';
import { Typography } from '../../theme/Typography';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Home');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>
              PHASE 0{currentStep + 1} / 03
            </Text>
          </View>
          <TouchableOpacity onPress={handleSkip} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
        </View>

        {/* Visual Content Area */}
        <View style={styles.visualContainer}>
          {currentStep === 0 && <ScreenOneVisual />}
          {currentStep === 1 && <ScreenTwoVisual />}
          {currentStep === 2 && <ScreenThreeVisual />}
        </View>

        {/* Bottom Content Area */}
        <View style={styles.bottomArea}>
          <Text style={styles.title}>
            {currentStep === 0 && 'Split smarter.'}
            {currentStep === 1 && 'Know who owes whom.'}
            {currentStep === 2 && 'Settle with less effort.'}
          </Text>

          <Text style={styles.description}>
            {currentStep === 0 &&
              'One command center for every shared expense across roommates, trips, and friends.'}
            {currentStep === 1 &&
              'FreeSplit keeps every shared payment clear, transparent and completely stress-free.'}
            {currentStep === 2 &&
              'Our debt simplification engine optimizes group balances so fewer total payments are needed.'}
          </Text>

          {/* Dots Indicator */}
          <View style={styles.dotsRow}>
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

          {/* Action Buttons */}
          <Button
            title={currentStep === 2 ? 'CREATE MY ACCOUNT' : 'NEXT'}
            variant={currentStep === 2 ? 'gradient' : 'primary'}
            size="lg"
            onPress={handleNext}
            style={styles.actionButton}
          />

          <TouchableOpacity
            onPress={handleSkip}
            style={styles.secondaryAction}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryActionText}>
              ALREADY HAVE AN ACCOUNT? <Text style={styles.cyanLink}>SIGN IN</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// --- VISUAL 1: Interactive Network Nodes ---
const ScreenOneVisual = () => {
  const nodes = [
    { label: 'Aarav', color: Colors.green, x: 120, y: 30 },
    { label: 'Priya', color: Colors.purple, x: 200, y: 80 },
    { label: 'You', color: Colors.cyan, x: 170, y: 170 },
    { label: 'Rohit', color: Colors.amber, x: 40, y: 150 },
    { label: 'Sneha', color: Colors.danger, x: 40, y: 60 },
  ];

  return (
    <View style={styles.networkContainer}>
      <View style={styles.badgeRow}>
        <StatusBadge status="online" label="FINANCIAL NETWORK ONLINE" />
      </View>

      <View style={styles.graphWrapper}>
        <Svg width={240} height={210} style={StyleSheet.absoluteFill}>
          {nodes.map((n, i) => (
            <Line
              key={i}
              x1={120}
              y1={105}
              x2={n.x}
              y2={n.y}
              stroke="rgba(0, 217, 255, 0.25)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          ))}
          {/* Outer ring guide */}
          <Circle
            cx={120}
            cy={105}
            r={85}
            stroke="rgba(0, 217, 255, 0.08)"
            strokeWidth={1}
          />
        </Svg>

        {/* Center Node */}
        <View style={styles.centerNode}>
          <View style={styles.centerNodeCore} />
        </View>

        {/* Satellite Member Nodes */}
        {nodes.map((node, i) => (
          <View
            key={i}
            style={[
              styles.satelliteNodeWrapper,
              { left: node.x - 18, top: node.y - 18 },
            ]}
          >
            <View
              style={[
                styles.satelliteNode,
                {
                  borderColor: node.color,
                  backgroundColor: `${node.color}15`,
                },
              ]}
            >
              <Text style={[styles.satelliteInitial, { color: node.color }]}>
                {node.label[0]}
              </Text>
            </View>
            <Text style={styles.satelliteLabel}>{node.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// --- VISUAL 2: Live Balance Flow Cards ---
const ScreenTwoVisual = () => {
  const flows = [
    { from: 'Aarav', to: 'Priya', amount: '₹1,200', fromColor: Colors.cyan, toColor: Colors.purple },
    { from: 'You', to: 'Aarav', amount: '₹850', fromColor: Colors.green, toColor: Colors.cyan },
    { from: 'Rohit', to: 'You', amount: '₹1,000', fromColor: Colors.amber, toColor: Colors.green },
  ];

  return (
    <View style={styles.flowsContainer}>
      <View style={styles.badgeRow}>
        <StatusBadge status="synced" label="BALANCE ENGINE // ACTIVE" />
      </View>

      <View style={styles.flowList}>
        {flows.map((flow, i) => (
          <View key={i} style={styles.flowCard}>
            <View
              style={[
                styles.flowAvatar,
                {
                  borderColor: flow.fromColor,
                  backgroundColor: `${flow.fromColor}15`,
                },
              ]}
            >
              <Text style={[styles.flowInitial, { color: flow.fromColor }]}>
                {flow.from[0]}
              </Text>
            </View>

            <View style={styles.flowDetails}>
              <Text style={styles.flowNames}>
                {flow.from} <Text style={styles.flowArrow}>→</Text> {flow.to}
              </Text>
            </View>

            <Text style={styles.flowAmount}>{flow.amount}</Text>

            <View
              style={[
                styles.flowAvatar,
                {
                  borderColor: flow.toColor,
                  backgroundColor: `${flow.toColor}15`,
                },
              ]}
            >
              <Text style={[styles.flowInitial, { color: flow.toColor }]}>
                {flow.to[0]}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

// --- VISUAL 3: Settlement Optimization Comparison ---
const ScreenThreeVisual = () => {
  return (
    <View style={styles.settlementContainer}>
      <View style={styles.badgeRow}>
        <StatusBadge status="optimized" label="SETTLEMENT ENGINE OPTIMIZED" />
      </View>

      {/* Before Box */}
      <View style={styles.comparisonBoxBefore}>
        <Text style={styles.comparisonLabelBefore}>BEFORE</Text>
        <Text style={styles.comparisonNumber}>4 TRANSACTIONS</Text>
        <View style={styles.barRow}>
          {[0, 1, 2, 3].map((idx) => (
            <View key={idx} style={styles.redBar} />
          ))}
        </View>
      </View>

      {/* Flow Indicator Arrow */}
      <View style={styles.settlementArrowContainer}>
        <View style={styles.settlementEngineBadge}>
          <Text style={styles.settlementEngineText}>↓ DEBT SIMPLIFICATION ↓</Text>
        </View>
      </View>

      {/* After Box */}
      <View style={styles.comparisonBoxAfter}>
        <Text style={styles.comparisonLabelAfter}>AFTER</Text>
        <Text style={styles.comparisonNumber}>2 TRANSACTIONS</Text>
        <View style={styles.barRow}>
          <View style={styles.greenBar} />
          <View style={styles.greenBar} />
          <View style={styles.grayBar} />
          <View style={styles.grayBar} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  stepIndicator: {
    borderColor: 'rgba(0, 217, 255, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 217, 255, 0.04)',
  },
  stepText: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1.2,
    color: Colors.cyan,
  },
  skipText: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    color: Colors.textMuted,
  },
  visualContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomArea: {
    paddingBottom: 8,
  },
  title: {
    fontFamily: Typography.family.display,
    fontSize: 26,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  description: {
    fontFamily: Typography.family.body,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  dot: {
    height: 3,
    borderRadius: 2,
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.cyan,
    shadowColor: Colors.cyan,
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: Colors.border,
  },
  actionButton: {
    marginBottom: 12,
  },
  secondaryAction: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  secondaryActionText: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  cyanLink: {
    color: Colors.cyan,
    fontWeight: '700',
  },

  // Visual 1 Styles
  networkContainer: {
    width: '100%',
    alignItems: 'center',
  },
  badgeRow: {
    marginBottom: 16,
    alignItems: 'center',
  },
  graphWrapper: {
    width: 240,
    height: 210,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerNode: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.cyan,
    backgroundColor: 'rgba(0, 217, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.cyan,
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  centerNodeCore: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.cyan,
  },
  satelliteNodeWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  satelliteNode: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  satelliteInitial: {
    fontFamily: Typography.family.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  satelliteLabel: {
    fontFamily: Typography.family.mono,
    fontSize: 8,
    color: Colors.textMuted,
    marginTop: 3,
    letterSpacing: 0.5,
  },

  // Visual 2 Styles
  flowsContainer: {
    width: '100%',
    paddingHorizontal: 8,
  },
  flowList: {
    gap: 10,
  },
  flowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.cardElevated,
    borderColor: Colors.border,
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
  flowInitial: {
    fontFamily: Typography.family.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  flowDetails: {
    flex: 1,
  },
  flowNames: {
    fontFamily: Typography.family.body,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  flowArrow: {
    color: Colors.textMuted,
  },
  flowAmount: {
    fontFamily: Typography.family.mono,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.cyan,
  },

  // Visual 3 Styles
  settlementContainer: {
    width: '100%',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  comparisonBoxBefore: {
    width: '100%',
    padding: 14,
    backgroundColor: 'rgba(255, 77, 109, 0.06)',
    borderColor: 'rgba(255, 77, 109, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
  },
  comparisonLabelBefore: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1.2,
    color: Colors.danger,
    marginBottom: 4,
  },
  comparisonNumber: {
    fontFamily: Typography.family.mono,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  barRow: {
    flexDirection: 'row',
    gap: 4,
  },
  redBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 77, 109, 0.5)',
  },
  settlementArrowContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  settlementEngineBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    borderColor: 'rgba(0, 217, 255, 0.3)',
    borderWidth: 1,
    backgroundColor: 'rgba(0, 217, 255, 0.05)',
  },
  settlementEngineText: {
    fontFamily: Typography.family.mono,
    fontSize: 8,
    letterSpacing: 1.2,
    color: Colors.cyan,
    fontWeight: '700',
  },
  comparisonBoxAfter: {
    width: '100%',
    padding: 14,
    backgroundColor: 'rgba(0, 245, 160, 0.06)',
    borderColor: 'rgba(0, 245, 160, 0.35)',
    borderWidth: 1,
    borderRadius: 10,
  },
  comparisonLabelAfter: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1.2,
    color: Colors.green,
    marginBottom: 4,
  },
  greenBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.green,
    shadowColor: Colors.green,
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  grayBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(18, 48, 67, 0.6)',
  },
});
