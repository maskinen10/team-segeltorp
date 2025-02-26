import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TransactionCategory } from '@/types/finance';
import { categoryColors } from '@/constants/colors';
import { categoryLabels } from '@/constants/categories';
import { colors } from '@/constants/colors';

interface CategoryPillProps {
  category: TransactionCategory;
  selected?: boolean;
  onPress?: (category: TransactionCategory) => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ 
  category, 
  selected = false,
  onPress 
}) => {
  const categoryColor = categoryColors[category];
  
  const handlePress = () => {
    if (onPress) {
      onPress(category);
    }
  };
  
  return (
    <Pressable 
      style={[
        styles.container, 
        { 
          backgroundColor: selected ? categoryColor : categoryColor + '20',
        }
      ]} 
      onPress={handlePress}
    >
      <Text 
        style={[
          styles.label,
          { color: selected ? colors.background : categoryColor }
        ]}
      >
        {categoryLabels[category]}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});