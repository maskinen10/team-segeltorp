import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinanceStore } from '@/store/finance-store';
import { TransactionItem } from '@/components/TransactionItem';
import { CategoryPill } from '@/components/CategoryPill';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/constants/colors';
import { Transaction, TransactionCategory } from '@/types/finance';
import { allCategories } from '@/constants/categories';
import { Search, Plus, Filter, Receipt } from 'lucide-react-native';
import { router } from 'expo-router';

export default function TransactionsScreen() {
  const { transactions } = useFinanceStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'expense' | 'income'>('all');
  
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by search query
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory ? transaction.category === selectedCategory : true;
    
    // Filter by type
    const matchesType = 
      filterType === 'all' ? true : 
      filterType === 'expense' ? transaction.isExpense : 
      !transaction.isExpense;
    
    return matchesSearch && matchesCategory && matchesType;
  });
  
  const handleTransactionPress = (transaction: Transaction) => {
    router.push({
      pathname: '/transaction/[id]',
      params: { id: transaction.id }
    });
  };
  
  const handleCategoryPress = (category: TransactionCategory) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };
  
  const handleAddTransaction = () => {
    router.push('/add');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions"
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <Pressable 
          style={styles.addButton}
          onPress={handleAddTransaction}
        >
          <Plus size={24} color={colors.background} />
        </Pressable>
      </View>
      
      <View style={styles.filterContainer}>
        <View style={styles.typeFilters}>
          <Pressable
            style={[
              styles.typeFilter,
              filterType === 'all' && styles.activeTypeFilter
            ]}
            onPress={() => setFilterType('all')}
          >
            <Text 
              style={[
                styles.typeFilterText,
                filterType === 'all' && styles.activeTypeFilterText
              ]}
            >
              All
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.typeFilter,
              filterType === 'expense' && styles.activeTypeFilter
            ]}
            onPress={() => setFilterType('expense')}
          >
            <Text 
              style={[
                styles.typeFilterText,
                filterType === 'expense' && styles.activeTypeFilterText
              ]}
            >
              Expenses
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.typeFilter,
              filterType === 'income' && styles.activeTypeFilter
            ]}
            onPress={() => setFilterType('income')}
          >
            <Text 
              style={[
                styles.typeFilterText,
                filterType === 'income' && styles.activeTypeFilterText
              ]}
            >
              Income
            </Text>
          </Pressable>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {allCategories.map(category => (
            <CategoryPill
              key={category}
              category={category}
              selected={selectedCategory === category}
              onPress={handleCategoryPress}
            />
          ))}
        </ScrollView>
      </View>
      
      {filteredTransactions.length > 0 ? (
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionItem 
              transaction={item}
              onPress={handleTransactionPress}
            />
          )}
          contentContainerStyle={styles.transactionsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          title="No transactions found"
          description="Try adjusting your filters or add a new transaction"
          icon={<Receipt size={48} color={colors.textTertiary} />}
          actionLabel="Add Transaction"
          onAction={handleAddTransaction}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: colors.text,
    fontSize: 16,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    paddingBottom: 12,
  },
  typeFilters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  typeFilter: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  activeTypeFilter: {
    backgroundColor: colors.primary + '20',
  },
  typeFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTypeFilterText: {
    color: colors.primary,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  transactionsList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
});

import { ScrollView } from 'react-native';