import { TransactionCategory } from '@/types/finance';
import { categoryColors } from './colors';
import { 
  ShoppingBag, 
  Utensils, 
  Car, 
  Film, 
  Home, 
  Lightbulb, 
  Heart, 
  GraduationCap, 
  Plane, 
  User, 
  DollarSign, 
  HelpCircle 
} from 'lucide-react-native';

export const categoryIcons: Record<TransactionCategory, any> = {
  food: Utensils,
  shopping: ShoppingBag,
  transport: Car,
  entertainment: Film,
  housing: Home,
  utilities: Lightbulb,
  healthcare: Heart,
  education: GraduationCap,
  travel: Plane,
  personal: User,
  income: DollarSign,
  other: HelpCircle,
};

export const categoryLabels: Record<TransactionCategory, string> = {
  food: 'Food & Dining',
  shopping: 'Shopping',
  transport: 'Transportation',
  entertainment: 'Entertainment',
  housing: 'Housing',
  utilities: 'Utilities',
  healthcare: 'Healthcare',
  education: 'Education',
  travel: 'Travel',
  personal: 'Personal',
  income: 'Income',
  other: 'Other',
};

export const allCategories: TransactionCategory[] = [
  'food',
  'shopping',
  'transport',
  'entertainment',
  'housing',
  'utilities',
  'healthcare',
  'education',
  'travel',
  'personal',
  'income',
  'other',
];

export const expenseCategories: TransactionCategory[] = allCategories.filter(
  (category) => category !== 'income'
);