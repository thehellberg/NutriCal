import { router, Stack } from 'expo-router'
import { Platform } from 'react-native'

import BackButton from '~/components/home/BackButton'

export default function HomeStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: ({ canGoBack, tintColor }) => {
          if (Platform.OS === 'ios') {
            return
          }
          return (
            <BackButton
              canGoBack={canGoBack || true}
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
        options={{
          title: 'Main',
          headerTitleAlign: 'center',
          headerShown: false
        }}
      />
      <Stack.Screen
        name={'post'}
        options={{
          title: 'Post',
          headerTitleAlign: 'center'
        }}
      />
    </Stack>
  )
}
