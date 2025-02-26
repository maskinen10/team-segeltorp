import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinanceStore } from '@/store/finance-store';
import { BalanceCard } from '@/components/BalanceCard';
import { TransactionItem } from '@/components/TransactionItem';
import { BudgetCard } from '@/components/BudgetCard';
import { GoalCard } from '@/components/GoalCard';
import { colors } from '@/constants/colors';
import { Transaction } from '@/types/finance';
import { ChevronRight, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { 
    transactions, 
    budgets, 
    goals,
    getTotalIncome,
    getTotalExpenses,
    getBalance
  } = useFinanceStore();
  
  const recentTransactions = transactions.slice(0, 5);
  
  const handleTransactionPress = (transaction: Transaction) => {
    // Navigate to transaction details
    router.push({
      pathname: '/transaction/[id]',
      params: { id: transaction.id }
    });
  };
  
  const handleAddTransaction = () => {
    router.push('/add');
  };
  
  const handleViewAllTransactions = () => {
    router.push('/transactions');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello there!</Text>
          <Text style={styles.subtitle}>Welcome to Spendwise</Text>
        </View>
        
        <BalanceCard 
          balance={getBalance()}
          income={getTotalIncome()}
          expenses={getTotalExpenses()}
        />
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <Pressable onPress={handleViewAllTransactions} style={styles.viewAll}>
              <Text style={styles.viewAllText}>View all</Text>
              <ChevronRight size={16} color={colors.primary} />
            </Pressable>
          </View>
          
          {recentTransactions.length > 0 ? (
            <View style={styles.transactionsList}>
              {recentTransactions.map(transaction => (
                <TransactionItem 
                  key={transaction.id} 
                  transaction={transaction}
                  onPress={handleTransactionPress}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No transactions yet</Text>
              <Pressable 
                style={styles.addButton}
                onPress={handleAddTransaction}
              >
                <Plus size={16} color={colors.background} />
                <Text style={styles.addButtonText}>Add Transaction</Text>
              </Pressable>
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Budget Overview</Text>
            <Pressable onPress={() => router.push('/budgets')} style={styles.viewAll}>
              <Text style={styles.viewAllText}>View all</Text>
              <ChevronRight size={16} color={colors.primary} />
            </Pressable>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.budgetsContainer}
          >
            {budgets.slice(0, 3).map(budget => (
              <View key={budget.id} style={styles.budgetCardWrapper}>
                <BudgetCard budget={budget} />
              </View>
            ))}
            <Pressable 
              style={styles.addBudgetCard}
              onPress={() => router.push('/budget/new')}
            >
              <Plus size={24} color={colors.primary} />
              <Text style={styles.addBudgetText}>Add Budget</Text>
            </Pressable>
          </ScrollView>
        </View>
        
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Financial Goals</Text>
            <Pressable onPress={() => router.push('/goals')} style={styles.viewAll}>
              <Text style={styles.viewAllText}>View all</Text>
              <ChevronRight size={16} color={colors.primary} />
            </Pressable>
          </View>
          
          {goals.slice(0, 2).map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  lastSection: {
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
  transactionsList: {
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.background,
    fontWeight: '600',
    marginLeft: 8,
  },
  budgetsContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  budgetCardWrapper: {
    width: 280,
    marginRight: 12,
  },
  addBudgetCard: {
    width: 140,
    height: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: colors.background,
  },
  addBudgetText: {
    color: colors.primary,
    fontWeight: '500',
    marginTop: 8,
  },
});