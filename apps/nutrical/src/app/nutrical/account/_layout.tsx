import { router, Stack } from 'expo-router'
import { Platform } from 'react-native'

import BackButton from '~/components/home/BackButton'

export default function AccountStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: ({ canGoBack, tintColor }) => {
          if (Platform.OS === 'ios') {
            return
          }
          return (
            <BackButton
              canGoBack={canGoBack || false}
              tintColor={tintColor || 'black'}
              onPress={router.back}
            />
          )
        },
        headerLeft: () => {
          if (Platform.OS === 'ios') {
            return
          }
        },
        headerTitleStyle: { fontFamily: 'Cairo-Medium' }
      }}
    >
      <Stack.Screen
        name={'index'}
        options={{ headerShown: false, title: 'Account' }}
      />
      <Stack.Screen
        name={'customize/personalDetails'}
        options={{ headerTitle: 'Personal Details' }}
      />
      <Stack.Screen
        name={'customize/foodPreferences'}
        options={{ headerTitle: 'Food Preferences' }}
      />
      <Stack.Screen
        name={'customize/sourceManagement'}
        options={{ headerTitle: 'Source Management' }}
      />
      <Stack.Screen
        name={'customize/dietaryNeeds'}
        options={{ headerTitle: 'Dietary Needs' }}
      />
    </Stack>
  )
}
