```tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Trophy, TrendingUp, Medal } from 'lucide-react-native';
import { useSalesStore } from '@/stores/sales-store';
import Colors from '@/constants/colors';

export default function LeaderboardScreen() {
  const { getMonthlyLeaderboard, getYearlyLeaderboard } = useSalesStore();
  
  const monthlyLeaders = getMonthlyLeaderboard();
  const yearlyLeaders = getYearlyLeaderboard();

  const LeaderCard = ({ rank, person, sales, goal }: { rank: number; person: any; sales: number; goal: number }) => {
    const progress = Math.min(100, (sales / goal) * 100);
    
    return (
      <View style={styles.leaderCard}>
        <View style={styles.rankBadge}>
          {rank === 1 ? (
            <Trophy size={24} color="#FFD700" />
          ) : rank === 2 ? (
            <Medal size={24} color="#C0C0C0" />
          ) : rank === 3 ? (
            <Medal size={24} color="#CD7F32" />
          ) : (
            <Text style={styles.rankText}>{rank}
          )}
        
        
        <View style={styles.leaderInfo}>
          <Text style={styles.leaderName}>{person.name}
          <Text style={styles.leaderStats}>{sales} av {goal} bilar
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          
        
        
        <View style={styles.trendIndicator}>
          <TrendingUp size={16} color={Colors.light.success} />
        
      
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Månadens toppsäljare
        {monthlyLeaders.length > 0 ? (
          monthlyLeaders.map((person, index) => (
            <LeaderCard
              key={person.id}
              rank={index + 1}
              person={person}
              sales={person.sales}
              goal={person.monthlyGoal}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Inga försäljningar registrerade denna månad
        )}
      

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Årets toppsäljare
        {yearlyLeaders.length > 0 ? (
          yearlyLeaders.map((person, index) => (
            <LeaderCard
              key={person.id}
              rank={index + 1}
              person={person}
              sales={person.sales}
              goal={person.yearlyGoal}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Inga försäljningar registrerade detta år
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
  leaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  leaderStats: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    marginBottom: 6,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.tint,
    borderRadius: 2,
  },
  trendIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
});
```
