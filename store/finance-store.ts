import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, Budget, FinancialGoal, TransactionCategory } from '@/types/finance';
import { mockTransactions } from '@/mocks/transactions';
import { mockBudgets } from '@/mocks/budgets';
import { mockGoals } from '@/mocks/goals';

interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
  goals: FinancialGoal[];
  
  // Transaction actions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  
  // Budget actions
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  
  // Goal actions
  addGoal: (goal: Omit<FinancialGoal, 'id'>) => void;
  updateGoal: (id: string, goal: Partial<FinancialGoal>) => void;
  deleteGoal: (id: string) => void;
  
  // Analytics helpers
  getTransactionsByCategory: (category: TransactionCategory) => Transaction[];
  getTransactionsByDateRange: (startDate: string, endDate: string) => Transaction[];
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getBalance: () => number;
  getCategoryTotal: (category: TransactionCategory) => number;
  getBudgetProgress: (budgetId: string) => { spent: number; remaining: number; percentage: number };
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      budgets: mockBudgets,
      goals: mockGoals,
      
      // Transaction actions
      addTransaction: (transaction) => {
        const newTransaction = {
          ...transaction,
          id: Date.now().toString(),
        };
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },
      
      updateTransaction: (id, transaction) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...transaction } : t
          ),
        }));
      },
      
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },
      
      // Budget actions
      addBudget: (budget) => {
        const newBudget = {
          ...budget,
          id: Date.now().toString(),
        };
        set((state) => ({
          budgets: [...state.budgets, newBudget],
        }));
      },
      
      updateBudget: (id, budget) => {
        set((state) => ({
          budgets: state.budgets.map((b) =>
            b.id === id ? { ...b, ...budget } : b
          ),
        }));
      },
      
      deleteBudget: (id) => {
        set((state) => ({
          budgets: state.budgets.filter((b) => b.id !== id),
        }));
      },
      
      // Goal actions
      addGoal: (goal) => {
        const newGoal = {
          ...goal,
          id: Date.now().toString(),
        };
        set((state) => ({
          goals: [...state.goals, newGoal],
        }));
      },
      
      updateGoal: (id, goal) => {
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, ...goal } : g
          ),
        }));
      },
      
      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        }));
      },
      
      // Analytics helpers
      getTransactionsByCategory: (category) => {
        return get().transactions.filter((t) => t.category === category);
      },
      
      getTransactionsByDateRange: (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        return get().transactions.filter((t) => {
          const date = new Date(t.date).getTime();
          return date >= start && date <= end;
        });
      },
      
      getTotalIncome: () => {
        return get().transactions
          .filter((t) => !t.isExpense)
          .reduce((sum, t) => sum + t.amount, 0);
      },
      
      getTotalExpenses: () => {
        return get().transactions
          .filter((t) => t.isExpense)
          .reduce((sum, t) => sum + t.amount, 0);
      },
      
      getBalance: () => {
        return get().getTotalIncome() - get().getTotalExpenses();
      },
      
      getCategoryTotal: (category) => {
        return get().transactions
          .filter((t) => t.category === category)
          .reduce((sum, t) => sum + (t.isExpense ? t.amount : 0), 0);
      },
      
      getBudgetProgress: (budgetId) => {
        const budget = get().budgets.find((b) => b.id === budgetId);
        if (!budget) {
          return { spent: 0, remaining: 0, percentage: 0 };
        }
        
        // Get current month's transactions for this category
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
        
        const categoryTransactions = get().transactions.filter(
          (t) => 
            t.category === budget.category && 
            t.isExpense &&
            t.date >= startOfMonth &&
            t.date <= endOfMonth
        );
        
        const spent = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
        const remaining = Math.max(0, budget.amount - spent);
        const percentage = Math.min(100, (spent / budget.amount) * 100);
        
        return { spent, remaining, percentage };
      },
    }),
    {
      name: 'finance-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);