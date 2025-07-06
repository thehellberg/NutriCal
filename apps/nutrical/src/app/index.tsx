import * as Notifications from 'expo-notifications'
import { Link, Redirect } from 'expo-router'
import { Pressable, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useStorageState } from '~/hooks/useStorageState'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  })
})
export default function Home() {
  const [[, token]] = useStorageState('token')

  if (token) {
    return <Redirect href={'/nutrical/home'} />
  }
  return (
    <SafeAreaView className={' bg-white'}>
      <View className={'h-full flex flex-col items-center'}>
        <View
          className={
            'flex flex-col justify-evenly items-center w-screen px-4 flex-grow'
          }
        >
          <Image
            source={require('iassets/logo.png')}
            className={'w-64 h-40'}
            resizeMode="contain"
          />
        </View>
        <View
          className={'flex flex-row w-full justify-center items-center mb-5'}
        >
          <Link
            href={'/signup'}
            asChild
          >
            <Pressable
              className={'bg-green-700 flex-grow rounded-lg shadow py-4 mx-1'}
            >
              <Text
                className={'text-white text-center text-lg font-display-medium'}
              >
                Signup
              </Text>
            </Pressable>
          </Link>
          <Link
            href={'/login'}
            asChild
          >
            <Pressable
              className={
                'bg-white border-2 border-green-700 flex-grow rounded-lg shadow py-4 mx-1'
              }
            >
              <Text
                className={
                  'text-green-700 text-center text-lg font-display-medium'
                }
              >
                Login
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}
