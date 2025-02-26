import { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import { CarType, CarBrand } from '@/types/sales';
import { NEW_CAR_BRANDS } from '@/constants/brands';
import { useTestDriveStore } from '@/stores/test-drive-store';
import { useNotificationStore } from '@/stores/notification-store';
import { useAuthStore } from '@/stores/auth-store';
import { Strings } from '@/constants/strings';
import Colors from '@/constants/colors';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function NewTestDriveModal({ visible, onClose }: Props) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [carType, setCarType] = useState<CarType>('new');
  const [carBrand, setCarBrand] = useState<CarBrand>('RENAULT');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const { addTestDrive } = useTestDriveStore();
  const { addNotification } = useNotificationStore();
  const { user } = useAuthStore();

  const handleSubmit = () => {
    if (!customerName || !customerPhone || !date || !user) return;

    const testDrive = {
      customerName,
      customerPhone,
      carType,
      carBrand: carType === 'new' ? carBrand : null,
      date,
      notes,
      salesPersonId: user.id,
      status: 'scheduled' as const,
    };

    addTestDrive(testDrive);
    
    addNotification(
      'test-drive',
      'Ny provkörning bokad',
      `${user.name} har bokat en provkörning med ${customerName} (${carType === 'new' ? carBrand : 'begagnad bil'})`
    );

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCustomerName('');
    setCustomerPhone('');
    setCarType('new');
    setCarBrand('RENAULT');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
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
          <Text style={styles.title}>{Strings.testDrive.newTestDrive}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.light.text} />
          </Pressable>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.label}>{Strings.testDrive.customer}</Text>
            <TextInput
              style={styles.input}
              value={customerName}
              onChangeText={setCustomerName}
              placeholder="Kundens namn"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{Strings.testDrive.phone}</Text>
            <TextInput
              style={styles.input}
              value={customerPhone}
              onChangeText={setCustomerPhone}
              placeholder="Telefonnummer"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{Strings.sales.carType}</Text>
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
                ]}>{Strings.common.new}</Text>
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
                ]}>{Strings.common.used}</Text>
              </Pressable>
            </View>
          </View>

          {carType === 'new' && (
            <View style={styles.section}>
              <Text style={styles.label}>{Strings.sales.brand}</Text>
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
            <Text style={styles.label}>{Strings.testDrive.date}</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{Strings.testDrive.notes}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Anteckningar..."
              multiline
              numberOfLines={4}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable 
            style={[styles.submitButton, (!customerName || !customerPhone || !date) && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!customerName || !customerPhone || !date}
          >
            <Text style={styles.submitButtonText}>{Strings.common.save}</Text>
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
