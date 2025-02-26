```tsx
import { Tabs } from 'expo-router';
import { Home, BarChart2, MessageSquare, Trophy, Car, FileText } from 'lucide-react-native';
import { Strings } from '@/constants/strings';
import Colors from '@/constants/colors';
import NotificationBell from '@/components/NotificationBell';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: true,
        headerRight: () => <NotificationBell />,
        headerRightContainerStyle: { paddingRight: 16 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: Strings.dashboard.title,
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: Strings.common.statistics,
          tabBarIcon: ({ color }) => <BarChart2 size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: Strings.common.leaderboard,
          tabBarIcon: ({ color }) => <Trophy size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="test-drives"
        options={{
          title: Strings.common.testDrives,
          tabBarIcon: ({ color }) => <Car size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: Strings.common.reports,
          tabBarIcon: ({ color }) => <FileText size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: Strings.common.chat,
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
        }}
      />
    
  );
}
```
