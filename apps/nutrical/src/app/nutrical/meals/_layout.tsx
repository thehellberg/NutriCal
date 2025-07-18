import { router, Stack } from 'expo-router'
import { Platform } from 'react-native'

import BackButton from '~/components/home/BackButton'

export default function MealStack() {
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
        options={{ headerShown: false, headerTitle: 'Meals' }}
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
        name={'recipe/add/index'}
        options={{ headerShown: true, headerTitle: 'Add Food' }}
      />
      <Stack.Screen
        name={'recipe/add/barcode'}
        options={{ headerShown: false, headerTitle: 'Scan Barcode' }}
      />
    </Stack>
  )
}
