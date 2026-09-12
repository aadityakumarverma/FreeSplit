import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme/Colors';
import { Typography } from '../../theme/Typography';
import { TopAppBar } from '../components/common/TopAppBar';
import { StatusBadge } from '../components/common/StatusBadge';
import { BalanceCard } from '../components/cards/BalanceCard';
import { Button } from '../components/common/Button';
import { HudCard } from '../components/common/HudCard';
import { ParticleBackground } from '../components/common/ParticleBackground';

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Subtle particle background */}
      <ParticleBackground nodeCount={10} maxDistance={100} />

      {/* Top App Header with proper insets */}
      <View style={{ paddingTop: insets.top, backgroundColor: Colors.card }}>
        <TopAppBar
          title="FREESPLIT"
          subtitle="FINANCIAL // SYSTEM"
          onNotificationPress={() => {}}
          onProfilePress={() => {}}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: Math.max(insets.bottom + 20, 32) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* System Online Status */}
        <View style={styles.statusRow}>
          <StatusBadge status="online" label="SYSTEM READY // 0 GROUPS ACTIVE" />
        </View>

        {/* Financial Net Balance Card - Zero Initial State */}
        <BalanceCard
          amount="₹0.00"
          label="OVERALL NET BALANCE"
          variant="neutral"
          subtitle="All balances settled. No pending debts."
          style={styles.mainBalanceCard}
        />

        {/* Secondary Metrics Row - Initial State */}
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <BalanceCard
              amount="₹0"
              label="YOU ARE OWED"
              variant="neutral"
            />
          </View>
          <View style={styles.metricItem}>
            <BalanceCard
              amount="₹0"
              label="YOU OWE"
              variant="neutral"
            />
          </View>
        </View>

        {/* Active Groups - Initial Empty State */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ACTIVE GROUPS</Text>
            <Text style={styles.sectionCount}>00 TOTAL</Text>
          </View>

          <HudCard elevated style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Text style={styles.emptyIconText}>⬡</Text>
            </View>
            <Text style={styles.emptyTitle}>NO ACTIVE GROUPS</Text>
            <Text style={styles.emptySubtitle}>
              You haven't joined or created any groups yet. Create a group to start tracking and splitting shared expenses.
            </Text>
            <Button
              title="+ CREATE FIRST GROUP"
              variant="primary"
              size="default"
              onPress={() => {}}
              style={styles.emptyButton}
            />
          </HudCard>
        </View>

        {/* Recent Transactions - Initial Empty State */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
            <Text style={styles.sectionCount}>00 TRANSACTIONS</Text>
          </View>

          <HudCard elevated style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Text style={styles.emptyIconText}>⌁</Text>
            </View>
            <Text style={styles.emptyTitle}>NO ACTIVITY YET</Text>
            <Text style={styles.emptySubtitle}>
              Transactions, payments, and debt optimizations will appear here once expenses are added.
            </Text>
            <Button
              title="+ ADD NEW EXPENSE"
              variant="ghost"
              size="default"
              onPress={() => {}}
              style={styles.emptyButton}
            />
          </HudCard>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  statusRow: {
    marginBottom: 14,
  },
  mainBalanceCard: {
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricItem: {
    flex: 1,
  },
  section: {
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Typography.family.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    color: Colors.cyan,
    fontWeight: '700',
  },
  sectionCount: {
    fontFamily: Typography.family.mono,
    fontSize: 9,
    letterSpacing: 1.2,
    color: Colors.textMuted,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 217, 255, 0.08)',
    borderColor: 'rgba(0, 217, 255, 0.25)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyIconText: {
    fontSize: 20,
    color: Colors.cyan,
  },
  emptyTitle: {
    fontFamily: Typography.family.mono,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontFamily: Typography.family.body,
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  emptyButton: {
    width: '100%',
  },
});
