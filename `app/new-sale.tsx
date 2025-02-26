```tsx
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useSalesStore } from '@/stores/sales-store';
import { useAuthStore } from '@/stores/auth-store';
import { useNotificationStore } from '@/stores/notification-store';
import Colors from '@/constants/colors';
import { CarBrand, CarType } from '@/types/sales';
import { NEW_CAR_BRANDS } from '@/constants/brands';

export default function NewSaleScreen() {
  const [carType, setCarType] = useState<CarType | null>(null);
  const [carBrand, setCarBrand] = useState<CarBrand | null>(null);
  const [value, setValue] = useState('');
  
  const { addSale } = useSalesStore();
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();

  const handleSubmit = () => {
    if (!carType || (carType === 'new' && !carBrand) || !user) return;

    const saleValue = value ? parseInt(value, 10) : 0;

    addSale({
      salesPersonId: user.id,
      carType,
      carBrand: carType === 'new' ? carBrand : null,
      value: saleValue,
    });

    // Skicka notifikation till alla
    addNotification(
      'sale',
      'Ny försäljning!',
      `${user.name} har sålt en ${carType === 'new' ? 'ny' : 'begagnad'} bil${carBrand ? ' (' + carBrand + ')' : ''}!`
    );

    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ny försäljning

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Biltyp
        <View style={styles.optionsGrid}>
          <Pressable
            style={[
              styles.optionButton,
              carType === 'new' && styles.optionButtonSelected
            ]}
            onPress={() => setCarType('new')}
          >
            <Text style={[
              styles.optionText,
              carType === 'new' && styles.optionTextSelected
            ]}>Ny bil
          

          <Pressable
            style={[
              styles.optionButton,
              carType === 'used' && styles.optionButtonSelected
            ]}
            onPress={() => setCarType('used')}
          >
            <Text style={[
              styles.optionText,
              carType === 'used' && styles.optionTextSelected
            ]}>Begagnad bil
          
        
      

      {carType === 'new' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Märke
          <View style={styles.brandsGrid}>
            {NEW_CAR_BRANDS.map(brand => (
              <Pressable
                key={brand}
                style={[
                  styles.brandButton,
                  carBrand === brand && styles.brandButtonSelected
                ]}
                onPress={() => setCarBrand(brand)}
              >
                <Text style={[
                  styles.brandText,
                  carBrand === brand && styles.brandTextSelected
                ]}>{brand}
              
            ))}
          
        
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Värde (kr)
        <TextInput
          style={styles.input}
          placeholder="Ange värde"
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />
      

      <Pressable 
        style={[
          styles.submitButton,
          (!carType || (carType === 'new' && !carBrand)) && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={!carType || (carType === 'new' && !carBrand)}
      >
        <Check size={24} color="#fff" />
        <Text style={styles.submitText}>Registrera försäljning
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: Colors.light.tint,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  optionTextSelected: {
    color: '#fff',
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  brandButton: {
    width: '30%',
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  brandButtonSelected: {
    backgroundColor: Colors.light.tint,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    textAlign: 'center',
  },
  brandTextSelected: {
    color: '#fff',
  },
  input: {
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: Colors.light.tint,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 24,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
```
