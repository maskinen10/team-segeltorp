```tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSalesStore } from '@/stores/sales-store';
import { useAuthStore } from '@/stores/auth-store';
import Colors from '@/constants/colors';

export default function StatsScreen() {
  const { sales, getKPIMetrics } = useSalesStore();
  const { user } = useAuthStore();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Filtrera försäljningar för inloggad användare
  const userSales = user ? sales.filter(sale => sale.salesPersonId === user.id) : [];

  // Beräkna statistik för aktuell månad
  const monthlyStats = {
    total: userSales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate.getMonth() === currentMonth && 
             saleDate.getFullYear() === currentYear;
    }).length,
    new: userSales.filter(sale => {
      const saleDate = new Date(sale.date);
      return sale.carType === 'new' && 
             saleDate.getMonth() === currentMonth && 
             saleDate.getFullYear() === currentYear;
    }).length,
    used: userSales.filter(sale => {
      const saleDate = new Date(sale.date);
      return sale.carType === 'used' && 
             saleDate.getMonth() === currentMonth && 
             saleDate.getFullYear() === currentYear;
    }).length,
  };

  // Beräkna statistik för hela året
  const yearlyStats = {
    total: userSales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate.getFullYear() === currentYear;
    }).length,
    new: userSales.filter(sale => {
      const saleDate = new Date(sale.date);
      return sale.carType === 'new' && 
             saleDate.getFullYear() === currentYear;
    }).length,
    used: userSales.filter(sale => {
      const saleDate = new Date(sale.date);
      return sale.carType === 'used' && 
             saleDate.getFullYear() === currentYear;
    }).length,
  };

  // Beräkna statistik per märke
  const brandStats = userSales
    .filter(sale => sale.carType === 'new')
    .reduce((acc, sale) => {
      if (sale.carBrand) {
        acc[sale.carBrand] = (acc[sale.carBrand] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Månadens översikt
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <Text style={styles.statValue}>{monthlyStats.total}
            <Text style={styles.statLabel}>Totalt
          
          <View style={styles.statsCard}>
            <Text style={styles.statValue}>{monthlyStats.new}
            <Text style={styles.statLabel}>Nya bilar
          
          <View style={styles.statsCard}>
            <Text style={styles.statValue}>{monthlyStats.used}
            <Text style={styles.statLabel}>Begagnade
          
        
      

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Årets översikt
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <Text style={styles.statValue}>{yearlyStats.total}
            <Text style={styles.statLabel}>Totalt
          
          <View style={styles.statsCard}>
            <Text style={styles.statValue}>{yearlyStats.new}
            <Text style={styles.statLabel}>Nya bilar
          
          <View style={styles.statsCard}>
            <Text style={styles.statValue}>{yearlyStats.used}
            <Text style={styles.statLabel}>Begagnade
          
        
      

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Märkesprestanda
        {Object.entries(brandStats).length > 0 ? (
          Object.entries(brandStats).map(([brand, count]) => (
            <View key={brand} style={styles.brandRow}>
              <Text style={styles.brandName}>{brand}
              <Text style={styles.brandCount}>{count}
            
          ))
        ) : (
          <Text style={styles.emptyText}>Inga nya bilar sålda ännu
        )}
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.light.text,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
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
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  brandName: {
    fontSize: 16,
    color: Colors.light.text,
  },
  brandCount: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
});
```
