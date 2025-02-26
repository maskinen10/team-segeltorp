import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Moon,
  CreditCard,
  Download,
  Share2
} from 'lucide-react-native';
import { useFinanceStore } from '@/store/finance-store';

export default function ProfileScreen() {
  const { transactions, budgets, goals } = useFinanceStore();
  
  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            // Handle logout
          },
        },
      ]
    );
  };
  
  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your transactions, budgets, and goals. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: () => {
            // Handle data clearing
          },
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <Pressable style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Pressable>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{transactions.length}</Text>
            <Text style={styles.statLabel}>Transactions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{budgets.length}</Text>
            <Text style={styles.statLabel}>Budgets</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{goals.length}</Text>
            <Text style={styles.statLabel}>Goals</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Settings size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>App Settings</Text>
            <ChevronRight size={20} color={colors.textTertiary} />
          </View>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <CreditCard size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Payment Methods</Text>
            <ChevronRight size={20} color={colors.textTertiary} />
          </View>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Bell size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
            <Switch 
              value={true}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={true ? colors.primary : colors.textTertiary}
            />
          </View>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Moon size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Dark Mode</Text>
            <Switch 
              value={false}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={false ? colors.primary : colors.textTertiary}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Download size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Export Data</Text>
            <ChevronRight size={20} color={colors.textTertiary} />
          </View>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Share2 size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Share App</Text>
            <ChevronRight size={20} color={colors.textTertiary} />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <HelpCircle size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <ChevronRight size={20} color={colors.textTertiary} />
          </View>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Shield size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Privacy Policy</Text>
            <ChevronRight size={20} color={colors.textTertiary} />
          </View>
        </View>
        
        <View style={styles.dangerSection}>
          <Pressable 
            style={styles.dangerButton}
            onPress={handleClearData}
          >
            <Text style={styles.dangerButtonText}>Clear All Data</Text>
          </Pressable>
          
          <Pressable 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <LogOut size={20} color={colors.danger} />
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.versionText}>Spendwise v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  section: {
    backgroundColor: colors.background,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  dangerSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  dangerButton: {
    backgroundColor: colors.danger + '10',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.danger,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.danger,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    color: colors.textTertiary,
  },
});