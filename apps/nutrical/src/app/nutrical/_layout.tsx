import { Redirect } from 'expo-router'
import { Tabs } from 'expo-router/tabs'
import {
  CircleUserRound,
  ClipboardList,
  LayoutDashboard,
  UtensilsCrossed
} from 'lucide-react-native'
import { Platform, Text } from 'react-native'

import { useSession } from '~/components/ctx'

export default function AppLayout() {
  const { token, isLoading } = useSession()
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Splash</Text>
  }
  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!token) {
    return <Redirect href="/login" />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS === 'android',
        tabBarLabelStyle: { fontFamily: 'Cairo-Bold' }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ size, color }) => (
            <LayoutDashboard
              size={size}
              color={color}
            />
          ),
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
          tabBarIcon: ({ size, color }) => (
            <UtensilsCrossed
              size={size}
              color={color}
            />
          ),
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="programs"
        options={{
          title: 'Programs',
          tabBarIcon: ({ size, color }) => (
            <ClipboardList
              size={size}
              color={color}
            />
          ),
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ size, color }) => (
            <CircleUserRound
              size={size}
              color={color}
            />
          ),
          headerShown: false
        }}
      />
    </Tabs>
  )
}
