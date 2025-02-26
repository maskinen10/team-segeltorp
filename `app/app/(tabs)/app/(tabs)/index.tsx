```tsx
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Plus, TrendingUp, Car, Clock } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useSalesStore } from '@/stores/sales-store';
import { useAuthStore } from '@/stores/auth-store';
import Colors from '@/constants/colors';

export default function DashboardScreen() {
  const { sales } = useSalesStore();
  const { user } = useAuthStore();

  // Filtrera försäljningar för inloggad användare
  const userSales = sales.filter(sale => sale.salesPersonId === user?.id);
  
  // Beräkna försäljning för aktuell månad
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlySales = userSales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate.getMonth() === currentMonth && 
           saleDate.getFullYear() === currentYear;
  });

  const totalSalesThisMonth = monthlySales.length;
  const progress = (totalSalesThisMonth / 20) * 100; // 20 bilar är målet per säljare

  const newCarSales = userSales.filter(sale => sale.carType === 'new').length;
  const usedCarSales = userSales.filter(sale => sale.carType === 'used').length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Försäljningsdashboard
        <Text style={styles.subtitle}>Välkommen {user?.name || 'Säljare'}
      

      <View style={styles.statsCard}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Månadens försäljning
          <Text style={styles.statValue}>{totalSalesThisMonth}
        
        
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        
        
        <Text style={styles.goalText}>
          Ditt mål: {totalSalesThisMonth}/20 bilar
        
      

      <View style={styles.statsGrid}>
        <View style={styles.statsGridItem}>
          <Car size={24} color={Colors.light.text} />
          <Text style={styles.statsGridValue}>{newCarSales}
          <Text style={styles.statsGridLabel}>Nya bilar
        
        
        <View style={styles.statsGridItem}>
          <Clock size={24} color={Colors.light.text} />
          <Text style={styles.statsGridValue}>{usedCarSales}
          <Text style={styles.statsGridLabel}>Begagnade bilar
        
      

      <View style={styles.quickActions}>
        <Link href="/new-sale" asChild>
          <Pressable style={styles.actionButton}>
            <Plus size={24} color={Colors.light.text} />
            <Text style={styles.actionText}>Ny försäljning
          
        
        
        <Link href="/stats" asChild>
          <Pressable style={styles.actionButton}>
            <TrendingUp size={24} color={Colors.light.text} />
            <Text style={styles.actionText}>Visa statistik
          
        
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 0,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.tint,
    borderRadius: 4,
  },
  goalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  statsGridItem: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statsGridValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  statsGridLabel: {
    fontSize: 14,
    color: '#666',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
  },
});
```
