```tsx
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Plus, Calendar, CheckCircle } from 'lucide-react-native';
import { useTestDriveStore } from '@/stores/test-drive-store';
import { useNotificationStore } from '@/stores/notification-store';
import { Strings } from '@/constants/strings';
import Colors from '@/constants/colors';
import NewTestDriveModal from '@/components/NewTestDriveModal';

export default function TestDrivesScreen() {
  const [showNewTestDrive, setShowNewTestDrive] = useState(false);
  const { getUpcoming, getCompleted, getTestDriveStats } = useTestDriveStore();

  const upcoming = getUpcoming();
  const completed = getCompleted();
  const stats = getTestDriveStats();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{Strings.common.testDrives}
        <Pressable 
          style={styles.addButton}
          onPress={() => setShowNewTestDrive(true)}
        >
          <Plus size={24} color={Colors.light.tint} />
        
      

      <View style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.total}
            <Text style={styles.statLabel}>{Strings.common.total}
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.completed}
            <Text style={styles.statLabel}>{Strings.testDrive.completed}
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.conversion.toFixed(1)}%
            <Text style={styles.statLabel}>Konvertering
          
        
      

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{Strings.testDrive.upcoming}
        {upcoming.length > 0 ? (
          upcoming.map(testDrive => (
            <View key={testDrive.id} style={styles.testDriveCard}>
              <Calendar size={20} color={Colors.light.text} />
              <View style={styles.testDriveInfo}>
                <Text style={styles.customerName}>{testDrive.customerName}
                <Text style={styles.testDriveDetails}>
                  {new Date(testDrive.date).toLocaleDateString('sv-SE')} - {' '}
                  {testDrive.carType === 'new' ? testDrive.carBrand : 'Begagnad'}
                
              
            
          ))
        ) : (
          <Text style={styles.emptyText}>Inga kommande provkörningar
        )}
      

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{Strings.testDrive.completed}
        {completed.length > 0 ? (
          completed.map(testDrive => (
            <View key={testDrive.id} style={styles.testDriveCard}>
              <CheckCircle size={20} color={Colors.light.success} />
              <View style={styles.testDriveInfo}>
                <Text style={styles.customerName}>{testDrive.customerName}
                <Text style={styles.testDriveDetails}>
                  {new Date(testDrive.date).toLocaleDateString('sv-SE')} - {' '}
                  {testDrive.carType === 'new' ? testDrive.carBrand : 'Begagnad'}
                
              
            
          ))
        ) : (
          <Text style={styles.emptyText}>Inga genomförda provkörningar
        )}
      

      <NewTestDriveModal
        visible={showNewTestDrive}
        onClose={() => setShowNewTestDrive(false)}
      />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsCard: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  testDriveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginBottom: 8,
  },
  testDriveInfo: {
    marginLeft: 12,
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  testDriveDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
});
```
