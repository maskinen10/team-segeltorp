import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinanceStore } from '@/store/finance-store';
import { Button } from '@/components/Button';
import { CategoryPill } from '@/components/CategoryPill';
import { colors } from '@/constants/colors';
import { TransactionCategory } from '@/types/finance';
import { expenseCategories, allCategories } from '@/constants/categories';
import { router } from 'expo-router';
import { ArrowLeft, DollarSign } from 'lucide-react-native';

export default function AddTransactionScreen() {
  const { addTransaction } = useFinanceStore();
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('food');
  const [isExpense, setIsExpense] = useState(true);
  
  const handleCategorySelect = (selectedCategory: TransactionCategory) => {
    setCategory(selectedCategory);
    
    // If income category is selected, automatically set isExpense to false
    if (selectedCategory === 'income') {
      setIsExpense(false);
    }
  };
  
  const handleTypeToggle = (expense: boolean) => {
    setIsExpense(expense);
    
    // If toggling to income, set category to income
    if (!expense) {
      setCategory('income');
    } else if (category === 'income') {
      // If switching from income to expense, set a default expense category
      setCategory('food');
    }
  };
  
  const handleSubmit = () => {
    if (!amount || !description || !category) {
      // Show validation error
      return;
    }
    
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      // Show amount validation error
      return;
    }
    
    addTransaction({
      amount: parsedAmount,
      description,
      category,
      date: new Date().toISOString(),
      isExpense,
    });
    
    // Navigate back or to home
    router.back();
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Add Transaction</Text>
          <View style={styles.placeholder} />
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.typeSelector}>
            <Pressable
              style={[
                styles.typeOption,
                isExpense && styles.activeTypeOption
              ]}
              onPress={() => handleTypeToggle(true)}
            >
              <Text 
                style={[
                  styles.typeText,
                  isExpense && styles.activeTypeText
                ]}
              >
                Expense
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.typeOption,
                !isExpense && styles.activeTypeOption
              ]}
              onPress={() => handleTypeToggle(false)}
            >
              <Text 
                style={[
                  styles.typeText,
                  !isExpense && styles.activeTypeText
                ]}
              >
                Income
              </Text>
            </Pressable>
          </View>
          
          <View style={styles.amountContainer}>
            <View style={styles.currencySymbol}>
              <DollarSign size={24} color={colors.text} />
            </View>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={colors.textTertiary}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              autoFocus
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.textInput}
              placeholder="What was this for?"
              placeholderTextColor={colors.textTertiary}
              value={description}
              onChangeText={setDescription}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Category</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {(isExpense ? expenseCategories : ['income']).map(cat => (
                <CategoryPill
                  key={cat}
                  category={cat}
                  selected={category === cat}
                  onPress={handleCategorySelect}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title="Add Transaction"
            onPress={handleSubmit}
            style={styles.submitButton}
            size="large"
            disabled={!amount || !description || !category}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTypeOption: {
    backgroundColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTypeText: {
    color: colors.text,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  currencySymbol: {
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoriesContainer: {
    flexWrap: 'wrap',
    paddingVertical: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  submitButton: {
    width: '100%',
  },
});