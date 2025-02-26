import { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { X } from 'lucide-react-native';
import { CarType, CarBrand } from '@/types/sales';
import { NEW_CAR_BRANDS } from '@/constants/brands';
import { useSalesStore } from '@/stores/sales-store';
import { useNotificationStore } from '@/stores/notification-store';
import Colors from '@/constants/colors';

interface Props {
  visible: boolean;
  onClose: () => void;
  salesPersonId: string;
  salesPersonName: string;
}

export default function NewSaleModal({ visible, onClose, salesPersonId, salesPersonName }: Props) {
  const [carType, setCarType] = useState<CarType>('new');
  const [carBrand, setCarBrand] = useState<CarBrand>('RENAULT');
  const [value, setValue] = useState('');

  const { addSale } = useSalesStore();
  const { addNotification } = useNotificationStore();

  const handleSubmit = () => {
    if (!value) return;

    const sale = {
      salesPersonId,
      carType,
      carBrand,
      value: parseFloat(value),
    };

    addSale(sale);
    
    addNotification(
      'sale',
      'New Sale! 🎉',
      `${salesPersonName} just sold a ${carType} ${carBrand} car!`
    );

    onClose();
    setCarType('new');
    setCarBrand('RENAULT');
    setValue('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>New Sale</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.light.text} />
          </Pressable>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Car Type</Text>
            <View style={styles.segmentedControl}>
              <Pressable
                style={[
                  styles.segment,
                  carType === 'new' && styles.segmentActive
                ]}
                onPress={() => setCarType('new')}
              >
                <Text style={[
                  styles.segmentText,
                  carType === 'new' && styles.segmentTextActive
                ]}>New</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.segment,
                  carType === 'used' && styles.segmentActive
                ]}
                onPress={() => setCarType('used')}
              >
                <Text style={[
                  styles.segmentText,
                  carType === 'used' && styles.segmentTextActive
                ]}>Used</Text>
              </Pressable>
            </View>
          </View>

          {carType === 'new' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Brand</Text>
              <View style={styles.brandGrid}>
                {NEW_CAR_BRANDS.map((brand) => (
                  <Pressable
                    key={brand}
                    style={[
                      styles.brandButton,
                      carBrand === brand && styles.brandButtonActive
                    ]}
                    onPress={() => setCarBrand(brand)}
                  >
                    <Text style={[
                      styles.brandButtonText,
                      carBrand === brand && styles.brandButtonTextActive
                    ]}>{brand}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Value</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter sale value"
              value={value}
              onChangeText={setValue}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable 
            style={[styles.submitButton, !value && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!value}
          >
            <Text style={styles.submitButtonText}>Submit Sale</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.light.text,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  segmentActive: {
    backgroundColor: Colors.light.background,
  },
  segmentText: {
    color: Colors.light.text,
    opacity: 0.6,
  },
  segmentTextActive: {
    opacity: 1,
    fontWeight: '600',
  },
  brandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  brandButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  brandButtonActive: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  brandButtonText: {
    color: Colors.light.text,
  },
  brandButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  submitButton: {
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
