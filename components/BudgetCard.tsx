import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Budget } from '@/types/finance';
import { formatCurrency } from '@/utils/format';
import { colors, categoryColors } from '@/constants/colors';
import { categoryLabels } from '@/constants/categories';
import { useFinanceStore } from '@/store/finance-store';

interface BudgetCardProps {
  budget: Budget;
  onPress?: (budget: Budget) => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget, onPress }) => {
  const { category, amount, period } = budget;
  const getBudgetProgress = useFinanceStore(state => state.getBudgetProgress);
  const { spent, remaining, percentage } = getBudgetProgress(budget.id);
  
  const handlePress = () => {
    if (onPress) {
      onPress(budget);
    }
  };
  
  const categoryColor = categoryColors[category];
  const isOverBudget = percentage >= 100;
  const isNearLimit = percentage >= 80 && percentage < 100;
  
  const progressBarColor = isOverBudget 
    ? colors.danger 
    : isNearLimit 
      ? colors.warning 
      : categoryColor;
  
  return (
    <Pressable 
      style={styles.container} 
      onPress={handlePress}
      android_ripple={{ color: colors.shadow }}
    >
      <View style={styles.header}>
        <Text style={styles.category}>{categoryLabels[category]}</Text>
        <Text style={styles.period}>{period}</Text>
      </View>
      
      <View style={styles.amountRow}>
        <Text style={styles.amount}>{formatCurrency(amount)}</Text>
        <Text style={[
          styles.remaining, 
          isOverBudget ? styles.overBudget : null
        ]}>
          {isOverBudget 
            ? `${formatCurrency(Math.abs(remaining))} over` 
            : `${formatCurrency(remaining)} left`}
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${Math.min(100, percentage)}%`,
              backgroundColor: progressBarColor 
            }
          ]} 
        />
      </View>
      
      <Text style={styles.spentText}>
        {formatCurrency(spent)} spent ({Math.round(percentage)}%)
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  period: {
    fontSize: 14,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  remaining: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  overBudget: {
    color: colors.danger,
  },
  progressContainer: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  spentText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});