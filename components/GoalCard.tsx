import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FinancialGoal } from '@/types/finance';
import { formatCurrency, formatDate } from '@/utils/format';
import { colors } from '@/constants/colors';

interface GoalCardProps {
  goal: FinancialGoal;
  onPress?: (goal: FinancialGoal) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onPress }) => {
  const { name, targetAmount, currentAmount, deadline } = goal;
  const progress = Math.min(100, (currentAmount / targetAmount) * 100);
  
  const handlePress = () => {
    if (onPress) {
      onPress(goal);
    }
  };
  
  return (
    <Pressable 
      style={styles.container} 
      onPress={handlePress}
      android_ripple={{ color: colors.shadow }}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        {deadline && (
          <Text style={styles.deadline}>Due {formatDate(deadline)}</Text>
        )}
      </View>
      
      <View style={styles.amountRow}>
        <Text style={styles.currentAmount}>
          {formatCurrency(currentAmount)}
        </Text>
        <Text style={styles.targetAmount}>
          of {formatCurrency(targetAmount)}
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${progress}%` }
          ]} 
        />
      </View>
      
      <Text style={styles.progressText}>
        {Math.round(progress)}% complete
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
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  deadline: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  currentAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 4,
  },
  targetAmount: {
    fontSize: 14,
    color: colors.textSecondary,
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
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});