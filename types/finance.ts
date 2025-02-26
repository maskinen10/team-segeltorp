export type TransactionCategory = 
  | 'food'
  | 'shopping'
  | 'transport'
  | 'entertainment'
  | 'housing'
  | 'utilities'
  | 'healthcare'
  | 'education'
  | 'travel'
  | 'personal'
  | 'income'
  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: TransactionCategory;
  date: string; // ISO string
  isExpense: boolean;
}

export interface Budget {
  id: string;
  category: TransactionCategory;
  amount: number;
  period: 'daily' | 'weekly' | 'monthly';
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string; // ISO string
}