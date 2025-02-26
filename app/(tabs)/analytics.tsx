import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinanceStore } from '@/store/finance-store';
import { colors, categoryColors } from '@/constants/colors';
import { formatCurrency } from '@/utils/format';
import { categoryLabels, categoryIcons } from '@/constants/categories';
import { TransactionCategory } from '@/types/finance';
import { PieChart, BarChart3, TrendingUp, Calendar } from 'lucide-react-native';

export default function AnalyticsScreen() {
  const { 
    transactions, 
    getTotalExpenses, 
    getCategoryTotal,
    getTotalIncome,
    getBalance
  } = useFinanceStore();
  
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  // Get all expense categories that have transactions
  const expenseCategories = Array.from(
    new Set(
      transactions
        .filter(t => t.isExpense)
        .map(t => t.category)
    )
  ) as TransactionCategory[];
  
  // Calculate total expenses for each category
  const categoryTotals = expenseCategories.map(category => ({
    category,
    amount: getCategoryTotal(category),
    percentage: (getCategoryTotal(category) / getTotalExpenses()) * 100
  }));
  
  // Sort categories by amount (highest first)
  categoryTotals.sort((a, b) => b.amount - a.amount);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <View style={styles.timeframeSelector}>
            <Pressable
              style={[
                styles.timeframeOption,
                timeframe === 'week' && styles.activeTimeframeOption
              ]}
              onPress={() => setTimeframe('week')}
            >
              <Text 
                style={[
                  styles.timeframeText,
                  timeframe === 'week' && styles.activeTimeframeText
                ]}
              >
                Week
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.timeframeOption,
                timeframe === 'month' && styles.activeTimeframeOption
              ]}
              onPress={() => setTimeframe('month')}
            >
              <Text 
                style={[
                  styles.timeframeText,
                  timeframe === 'month' && styles.activeTimeframeText
                ]}
              >
                Month
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.timeframeOption,
                timeframe === 'year' && styles.activeTimeframeOption
              ]}
              onPress={() => setTimeframe('year')}
            >
              <Text 
                style={[
                  styles.timeframeText,
                  timeframe === 'year' && styles.activeTimeframeText
                ]}
              >
                Year
              </Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconContainer}>
              <TrendingUp size={20} color={colors.success} />
            </View>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(getTotalIncome())}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconContainer, { backgroundColor: colors.danger + '20' }]}>
              <BarChart3 size={20} color={colors.danger} />
            </View>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(getTotalExpenses())}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconContainer, { backgroundColor: colors.primary + '20' }]}>
              <PieChart size={20} color={colors.primary} />
            </View>
            <Text style={styles.summaryLabel}>Balance</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(getBalance())}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spending by Category</Text>
          
          {categoryTotals.length > 0 ? (
            <View style={styles.categoryList}>
              {categoryTotals.map(({ category, amount, percentage }) => {
                const Icon = categoryIcons[category];
                return (
                  <View key={category} style={styles.categoryItem}>
                    <View style={styles.categoryHeader}>
                      <View style={[
                        styles.categoryIcon, 
                        { backgroundColor: categoryColors[category] + '20' }
                      ]}>
                        <Icon size={16} color={categoryColors[category]} />
                      </View>
                      <Text style={styles.categoryName}>{categoryLabels[category]}</Text>
                      <Text style={styles.categoryPercentage}>{percentage.toFixed(1)}%</Text>
                    </View>
                    
                    <View style={styles.progressContainer}>
                      <View 
                        style={[
                          styles.progressBar, 
                          { 
                            width: `${percentage}%`,
                            backgroundColor: categoryColors[category] 
                          }
                        ]} 
                      />
                    </View>
                    
                    <Text style={styles.categoryAmount}>{formatCurrency(amount)}</Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No expense data available</Text>
            </View>
          )}
        </View>
        
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Monthly Trend</Text>
          
          <View style={styles.trendPlaceholder}>
            <Calendar size={48} color={colors.textTertiary} />
            <Text style={styles.trendPlaceholderText}>
              Spending trends will appear here as you add more transactions
            </Text>
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  timeframeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  timeframeOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTimeframeOption: {
    backgroundColor: colors.primary,
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTimeframeText: {
    color: colors.background,
  },
  summaryCards: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  section: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lastSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  categoryList: {
    gap: 16,
  },
  categoryItem: {
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  categoryPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  progressContainer: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  categoryAmount: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  trendPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  trendPlaceholderText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: '80%',
  },
});