import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { reloadAppAsync } from 'expo'
import { Image } from 'expo-image'
import { Linking, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useSWR from 'swr'

import { useSession } from '~/components/ctx'
import { Session, User } from '~/types'

dayjs.extend(customParseFormat)

export default function Profile() {
  const { signOut } = useSession()
  const { data: account, isLoading } = useSWR<
    | { error: true; message: string }
    | { error: false; data: { session: Session; user: User } }
  >(`account`)
  if (isLoading) {
    return (
      <SafeAreaView className={'h-screen'}>
        <View className={'flex flex-col items-center justify-center h-full'}>
          <Text className={'text-lg font-display-bold'}>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }
  if (account?.error) {
    return (
      <SafeAreaView className={'h-screen'}>
        <View className={'flex flex-col items-center justify-center h-full'}>
          <Text className={'text-lg font-display-bold text-red-600'}>
            {account.message}
          </Text>
          <Pressable
            className={'bg-blue-500 text-white p-2 rounded-lg mt-4'}
            onPress={() => {
              signOut()
              reloadAppAsync()
            }}
          >
            <Text className={'text-lg font-display-bold'}>Sign out</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className={'h-screen'}>
      <ScrollView>
        <Text className={'font-display-bold text-2xl mx-4 text-left mt-4 mb-1'}>
          Account
        </Text>
        <View
          className={'flex flex-col bg-white rounded-lg shadow mx-4 mt-2 p-4'}
        >
          <View className={'flex flex-row items-start'}>
            <Image
              source={require('@assets/icons8-male-user-96.png')}
              className={'h-20 rounded-full w-20'}
            />
            <View
              className={'flex flex-col items-start justify-center ml-2 py-2'}
            >
              <Text className={'text-lg font-display-bold'}>
                {account?.data.user.firstName} {account?.data.user.lastName}
              </Text>
              <Text className={'font-display text-base text-gray-400'}>
                {account?.data.user.sex === 'M' ? 'Male' : 'Female'}
              </Text>
            </View>
          </View>
        </View>
        <Text
          className={
            'font-display-bold text-lg self-start mx-4 mt-4 mb-1 text-gray-600'
          }
        >
          Modify
        </Text>
        <View className={'mx-4'}>
          <Pressable
            className={
              'bg-white rounded-full border-gray-200 border-2 py-2 mb-4'
            }
            onPress={() => {
              signOut()
              reloadAppAsync()
            }}
          >
            <Text
              className={'text-red-600 text-lg font-display-medium text-center'}
            >
              Sign out
            </Text>
          </Pressable>
          <Pressable
            className={'bg-white rounded-full border-gray-200 border-2 py-2'}
            onPress={() => {
              Linking.openURL('https://example.com/deletemydata')
            }}
          >
            <Text
              className={'text-red-600 text-lg font-display-medium text-center'}
            >
              Account Deletion Request
            </Text>
          </Pressable>
        </View>
        <Text
          className={
            'font-display-bold text-lg self-start mx-4 mt-4 mb-1 text-gray-600'
          }
        >
          Legal
        </Text>

        <View className={'mx-4'}>
          <Pressable
            className={
              'bg-white rounded-full border-gray-200 border-2 py-2 mb-4'
            }
            onPress={() => {
              Linking.openURL('https://example.com/PrivacyPolicy.htm')
            }}
          >
            <Text className={'text-lg font-display-medium text-center'}>
              Terms of Service
            </Text>
          </Pressable>
          <Pressable
            className={'bg-white rounded-full border-gray-200 border-2 py-2'}
            onPress={() => {
              Linking.openURL('https://example.com/Termsofuse.htm')
            }}
          >
            <Text className={'text-lg font-display-medium text-center'}>
              Privacy Policy
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
