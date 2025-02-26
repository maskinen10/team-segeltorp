import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinanceStore } from '@/store/finance-store';
import { colors, categoryColors } from '@/constants/colors';
import { formatCurrency, formatDate } from '@/utils/format';
import { categoryIcons, categoryLabels } from '@/constants/categories';
import { Button } from '@/components/Button';
import { Trash2, Edit, ArrowLeft } from 'lucide-react-native';

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { transactions, deleteTransaction } = useFinanceStore();
  
  const transaction = transactions.find(t => t.id === id);
  
  if (!transaction) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Transaction not found</Text>
        <Button 
          title="Go Back" 
          onPress={() => router.back()} 
          style={styles.backButton}
        />
      </View>
    );
  }
  
  const { amount, description, category, date, isExpense } = transaction;
  const Icon = categoryIcons[category];
  const categoryColor = categoryColors[category];
  
  const handleEdit = () => {
    router.push({
      pathname: '/transaction/edit/[id]',
      params: { id }
    });
  };
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTransaction(id);
            router.back();
          },
        },
      ]
    );
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Transaction Details',
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerButton}>
              <ArrowLeft size={24} color={colors.text} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={handleEdit} style={styles.headerButton}>
              <Edit size={24} color={colors.primary} />
            </Pressable>
          ),
        }} 
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.card}>
            <View style={[styles.amountContainer, isExpense ? styles.expenseAmount : styles.incomeAmount]}>
              <Text style={styles.amountLabel}>{isExpense ? 'Expense' : 'Income'}</Text>
              <Text style={styles.amount}>
                {isExpense ? '-' : '+'}{formatCurrency(amount)}
              </Text>
            </View>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Description</Text>
                <Text style={styles.detailValue}>{description}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Category</Text>
                <View style={styles.categoryContainer}>
                  <View style={[styles.categoryIcon, { backgroundColor: categoryColor + '20' }]}>
                    <Icon size={16} color={categoryColor} />
                  </View>
                  <Text style={styles.categoryText}>{categoryLabels[category]}</Text>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{formatDate(date)}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Transaction ID</Text>
                <Text style={styles.detailValue}>{id}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title="Delete Transaction"
            onPress={handleDelete}
            variant="danger"
            icon={<Trash2 size={20} color="#fff" />}
            style={styles.deleteButton}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  headerButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  amountContainer: {
    padding: 24,
    alignItems: 'center',
  },
  expenseAmount: {
    backgroundColor: colors.danger + '10',
  },
  incomeAmount: {
    backgroundColor: colors.success + '10',
  },
  amountLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  deleteButton: {
    width: '100%',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  backButton: {
    minWidth: 120,
  },
});