import { router, Stack } from 'expo-router'
import { Platform, View } from 'react-native'

import BackButton from '~/components/home/BackButton'

export default function AccountStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: ({ canGoBack, tintColor }) => {
          if (Platform.OS === 'ios') {
            return <View></View>
          }
          return (
            <BackButton
              canGoBack={canGoBack || false}
              tintColor={tintColor || 'black'}
              onPress={router.back}
            />
          )
        },
        headerLeft: ({ canGoBack, tintColor }) => {
          if (Platform.OS !== 'ios') {
            return <View></View>
          }
          return (
            <BackButton
              canGoBack={canGoBack || false}
              tintColor={tintColor || 'black'}
              onPress={router.back}
            />
          )
        },
        headerTitleStyle: { fontFamily: 'Cairo-Medium' }
      }}
    >
      <Stack.Screen
        name={'index'}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'customize/personalDetails'}
        options={{ headerTitle: 'Personal Details' }}
      />
      <Stack.Screen
        name={'customize/foodPreferences'}
        options={{ headerTitle: 'Personal Details' }}
      />
    </Stack>
  )
}
