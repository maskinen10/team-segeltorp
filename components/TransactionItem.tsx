import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Transaction } from '@/types/finance';
import { formatCurrency, formatShortDate } from '@/utils/format';
import { categoryColors } from '@/constants/colors';
import { categoryIcons } from '@/constants/categories';
import { colors } from '@/constants/colors';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ 
  transaction, 
  onPress 
}) => {
  const { amount, description, category, date, isExpense } = transaction;
  const Icon = categoryIcons[category];
  const categoryColor = categoryColors[category];
  
  const handlePress = () => {
    if (onPress) {
      onPress(transaction);
    }
  };
  
  return (
    <Pressable 
      style={styles.container} 
      onPress={handlePress}
      android_ripple={{ color: colors.shadow }}
    >
      <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
        <Icon size={20} color={categoryColor} />
      </View>
      
      <View style={styles.details}>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
        <Text style={styles.date}>{formatShortDate(date)}</Text>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={[
          styles.amount, 
          isExpense ? styles.expense : styles.income
        ]}>
          {isExpense ? '-' : '+'}{formatCurrency(amount)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  expense: {
    color: colors.danger,
  },
  income: {
    color: colors.success,
  },
});