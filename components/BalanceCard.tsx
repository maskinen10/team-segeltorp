import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '@/utils/format';
import { colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ 
  balance, 
  income, 
  expenses 
}) => {
  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <ArrowUpRight size={16} color={colors.success} />
          </View>
          <View>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={styles.statAmount}>{formatCurrency(income)}</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <ArrowDownRight size={16} color={colors.danger} />
          </View>
          <View>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={styles.statAmount}>{formatCurrency(expenses)}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceContainer: {
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 12,
  },
});