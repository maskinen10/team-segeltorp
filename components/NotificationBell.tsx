```typescript
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import { Bell, X, ShoppingBag, Car, Trophy, MessageSquare } from 'lucide-react-native';
import { useNotificationStore } from '@/stores/notification-store';
import Colors from '@/constants/colors';

export default function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, markAsRead, markAllAsRead, getUnreadCount } = useNotificationStore();
  
  const unreadCount = getUnreadCount();

  const handleNotificationPress = (id: string) => {
    markAsRead(id);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return <ShoppingBag size={20} color={Colors.light.tint} />;
      case 'test-drive':
        return <Car size={20} color={Colors.light.tint} />;
      case 'goal':
        return <Trophy size={20} color={Colors.light.tint} />;
      case 'chat':
        return <MessageSquare size={20} color={Colors.light.tint} />;
      default:
        return <Bell size={20} color={Colors.light.tint} />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min sedan`;
    } else if (diffHours < 24) {
      return `${diffHours} tim sedan`;
    } else if (diffDays < 7) {
      return `${diffDays} dag${diffDays !== 1 ? 'ar' : ''} sedan`;
    } else {
      return date.toLocaleDateString('sv-SE');
    }
  };

  return (
    <>
      <Pressable 
        style={styles.bellContainer} 
        onPress={() => setShowNotifications(true)}
      >
        <Bell size={24} color={Colors.light.text} />
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}
          
        )}
      

      <Modal
        visible={showNotifications}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.notificationPanel}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>Notifikationer
              <Pressable onPress={() => setShowNotifications(false)}>
                <X size={24} color={Colors.light.text} />
              
            

            {notifications.length > 0 ? (
              <>
                <FlatList
                  data={notifications}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <Pressable 
                      style={[
                        styles.notificationItem,
                        !item.read && styles.unreadNotification
                      ]}
                      onPress={() => handleNotificationPress(item.id)}
                    >
                      <View style={styles.notificationIcon}>
                        {getNotificationIcon(item.type)}
                      
                      <View style={styles.notificationContent}>
                        <Text style={styles.notificationItemTitle}>{item.title}
                        <Text style={styles.notificationMessage}>{item.message}
                        <Text style={styles.notificationTime}>
                          {formatTimestamp(item.timestamp)}
                        
                      
                    
                  )}
                  style={styles.notificationList}
                />

                <Pressable 
                  style={styles.markAllButton}
                  onPress={() => markAllAsRead()}
                >
                  <Text style={styles.markAllText}>Markera alla som lästa
                
              </>
            ) : (
              <View style={styles.emptyContainer}>
                <Bell size={48} color="#ccc" />
                <Text style={styles.emptyText}>Inga notifikationer
              
            )}
          
        
      
    </>
  );
}

const styles = StyleSheet.create({
  bellContainer: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.light.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  notificationPanel: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  notificationList: {
    maxHeight: '70%',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  unreadNotification: {
    backgroundColor: `${Colors.light.tint}10`,
  },
  notificationIcon: {
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.light.tint}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  markAllButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  markAllText: {
    color: Colors.light.tint,
    fontSize: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
```
