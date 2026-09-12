import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Colors } from '../../theme/Colors';
import { Typography } from '../../theme/Typography';
import { TopAppBar } from '../components/common/TopAppBar';
import { StatusBadge } from '../components/common/StatusBadge';
import { BalanceCard } from '../components/cards/BalanceCard';
import { GroupCard } from '../components/cards/GroupCard';
import { TransactionRow } from '../components/cards/TransactionRow';
import { Button } from '../components/common/Button';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* Top App Header */}
      <TopAppBar
        title="FREESPLIT"
        subtitle="FINANCIAL // SYSTEM"
        onNotificationPress={() => {}}
        onProfilePress={() => {}}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* System Online Status */}
        <View style={styles.statusRow}>
          <StatusBadge status="online" label="SYSTEM ONLINE // 3 GROUPS SYNCED" />
        </View>

        {/* Financial Net Balance Card */}
        <BalanceCard
          amount="+₹4,350.00"
          label="OVERALL NET BALANCE"
          variant="positive"
          subtitle="You are owed money across all active groups"
          style={styles.mainBalanceCard}
        />

        {/* Secondary Metrics Row */}
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <BalanceCard
              amount="₹5,200"
              label="YOU ARE OWED"
              variant="positive"
            />
          </View>
          <View style={styles.metricItem}>
            <BalanceCard
              amount="₹850"
              label="YOU OWE"
              variant="negative"
            />
          </View>
        </View>

        {/* Quick Action Button */}
        <Button
          title="+ RECORD NEW EXPENSE"
          variant="gradient"
          size="default"
          style={styles.addExpenseButton}
          onPress={() => {}}
        />

        {/* Active Groups Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ACTIVE GROUPS</Text>
            <Text style={styles.sectionCount}>03 TOTAL</Text>
          </View>

          <GroupCard
            name="GOA TRIP 2026"
            members={4}
            total="₹28,400"
            active
            memberInitials={['A', 'P', 'R', 'S']}
            onPress={() => {}}
          />

          <GroupCard
            name="APARTMENT 402 FLATMATES"
            members={3}
            total="₹14,500"
            memberInitials={['A', 'R', 'Y']}
            onPress={() => {}}
          />

          <GroupCard
            name="WEEKEND DINNER & MOVIES"
            members={5}
            total="₹6,200"
            memberInitials={['P', 'S', 'M', 'A', 'K']}
            onPress={() => {}}
          />
        </View>

        {/* Recent Transactions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
            <Text style={styles.sectionCount}>LATEST TRANSFERS</Text>
          </View>

          <View style={styles.transactionCard}>
            <TransactionRow
              name="Aarav Sharma"
              amount="₹1,200.00"
              direction="owed"
              date="YESTERDAY 21:40 // GOA TRIP"
              avatar="A"
              onPress={() => {}}
            />
            <TransactionRow
              name="Priya Patel"
              amount="₹450.00"
              direction="owe"
              date="11 SEP 14:15 // DINNER"
              avatar="P"
              onPress={() => {}}
            />
            <TransactionRow
              name="Rohit Verma"
              amount="₹1,000.00"
              direction="owed"
              date="09 SEP 19:30 // APARTMENT 402"
              avatar="R"
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
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
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
  },
  addExpenseButton: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  transactionCard: {
    backgroundColor: Colors.cardElevated,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});
