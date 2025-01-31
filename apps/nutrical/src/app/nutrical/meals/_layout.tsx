import { router, Stack } from 'expo-router'
import { Platform, View } from 'react-native'

import BackButton from '~/components/home/BackButton'

export default function MealStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: ({ canGoBack, tintColor }) => {
          if (Platform.OS === 'ios') {
            return <View></View>
          }
          return (
            <BackButton
              canGoBack={canGoBack || true}
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'[meal]'}
        options={{}}
      />
      <Stack.Screen
        name={'recipe/[recipe]'}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'recipe/add'}
        options={{ headerShown: false }}
      />
    </Stack>
  )
}
