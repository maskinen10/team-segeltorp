import { FinancialGoal } from '@/types/finance';

export const mockGoals: FinancialGoal[] = [
  {
    id: '1',
    name: 'Vacation Fund',
    targetAmount: 2000,
    currentAmount: 750,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(), // 90 days from now
  },
  {
    id: '2',
    name: 'New Laptop',
    targetAmount: 1500,
    currentAmount: 500,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(), // 60 days from now
  },
  {
    id: '3',
    name: 'Emergency Fund',
    targetAmount: 5000,
    currentAmount: 2000,
  },
];