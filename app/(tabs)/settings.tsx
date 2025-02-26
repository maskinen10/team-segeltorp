```tsx
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { LogOut, UserPlus, Bell, Shield, Settings as SettingsIcon, Mail } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/auth-store';
import Colors from '@/constants/colors';

export default function SettingsScreen() {
  const { user, logout } = useAuthStore();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const isAdmin = user?.role === 'admin';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inställningar
      

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profil
        <View style={styles.card}>
          <Text style={styles.name}>{user?.name}
          <Text style={styles.email}>{user?.email}
          <Text style={styles.role}>
            {user?.role === 'admin' ? 'Administratör' : 
             user?.role === 'manager' ? 'Chef' : 'Säljare'}
          
        
      

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifikationer
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color={Colors.light.text} />
            <Text style={styles.settingLabel}>Push-notiser
          
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: Colors.light.border, true: Colors.light.tint }}
          />
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Mail size={20} color={Colors.light.text} />
            <Text style={styles.settingLabel}>Email-sammanfattningar
          
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            trackColor={{ false: Colors.light.border, true: Colors.light.tint }}
          />
        
      

      {isAdmin && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Administration
          <Pressable style={styles.button} onPress={() => router.push('/team-management')}>
            <UserPlus size={20} color="#fff" />
            <Text style={styles.buttonText}>Hantera teammedlemmar
          
          <Pressable style={styles.button} onPress={() => router.push('/roles')}>
            <Shield size={20} color="#fff" />
            <Text style={styles.buttonText}>Hantera roller
          
        
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App-inställningar
        <Pressable style={styles.button} onPress={() => router.push('/app-settings')}>
          <SettingsIcon size={20} color="#fff" />
          <Text style={styles.buttonText}>Allmänna inställningar
        
      

      <Pressable style={styles.logoutButton} onPress={logout}>
        <LogOut size={20} color={Colors.light.error} />
        <Text style={styles.logoutText}>Logga ut
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  role: {
    fontSize: 14,
    color: Colors.light.tint,
    marginTop: 4,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.light.text,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
    margin: 16,
  },
  logoutText: {
    color: Colors.light.error,
    fontSize: 16,
    fontWeight: '500',
  },
});
```
