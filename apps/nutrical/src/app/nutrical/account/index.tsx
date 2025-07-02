import { differenceInYears } from 'date-fns'
import { reloadAppAsync } from 'expo'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { ChartPie, HandPlatter, UserRound } from 'lucide-react-native'
import { Linking, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useSWR from 'swr'

import type { GetAccountReturn } from '@backend/types'

import Border from '~/components/account/Border'
import CustomizeRow from '~/components/account/CustomizeRow'
import { useStorageState } from '~/hooks/useStorageState'

export default function Profile() {
  const [, setToken] = useStorageState('token')
  const { data: account, isLoading } = useSWR<
    { error: true; message: string } | { error: false; data: GetAccountReturn }
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
              setToken(null)
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
    <SafeAreaView
      className={' bg-white h-screen'}
      edges={['top', 'left', 'right']}
    >
      <ScrollView>
        <Text
          className={'text-4xl font-display-medium self-start mx-4 mb-2 mt-8'}
        >
          Account
        </Text>
        <View className="bg-gray-100 h-full">
          <View className={'flex flex-col bg-white rounded-lg mx-4 mt-4 p-4 '}>
            <View className={'flex flex-row items-start'}>
              <Image
                source={require('@assets/icons8-male-user-96.png')}
                className={'h-24 rounded-full w-24'}
              />
              <View
                className={
                  'flex flex-col items-start justify-end h-20 ml-2 py-2'
                }
              >
                <Text className={'text-xl font-display-medium'}>
                  {account?.data.user?.firstName +
                    ' ' +
                    account?.data.user?.lastName || 'Me'}
                </Text>
                <Text className={'font-display text-base text-gray-400'}>
                  {differenceInYears(
                    new Date(),
                    new Date(account?.data.user?.dateOfBirth || 0)
                  ) + ' years'}
                </Text>
              </View>
            </View>
            <Border />
            {account?.data.user?.weight && (
              <View className="flex flex-row items-center justify-between mt-4 mb-2">
                <Text className="font-display">Current Weight</Text>
                <Text className="font-display-medium">
                  {account?.data.user?.weight.substring(
                    0,
                    account?.data.user?.weight.length - 1
                  ) + ' kg'}
                </Text>
              </View>
            )}
          </View>
          <Text
            className={
              'font-display-medium text-xl text-gray-600 px-4 mt-4 mb-1'
            }
          >
            Customization
          </Text>
          <View
            className={
              'mx-4 bg-white flex flex-col rounded-lg overflow-hidden p-4 gap-1'
            }
          >
            <Link
              href={'/nutrical/account/customize/personalDetails'}
              asChild
            >
              <Pressable>
                <CustomizeRow title="Personal Details">
                  <UserRound />
                </CustomizeRow>
              </Pressable>
            </Link>
            <Border />
            <Link
              href={'/nutrical/account/customize/foodPreferences'}
              asChild
            >
              <Pressable>
                <CustomizeRow title="Food Preferences">
                  <HandPlatter />
                </CustomizeRow>
              </Pressable>
            </Link>
            <Border />
            <Link
              href={'/nutrical/account/customize/dietaryNeeds'}
              asChild
            >
              <Pressable>
                <CustomizeRow title="Dietary Needs">
                  <ChartPie />
                </CustomizeRow>
              </Pressable>
            </Link>
          </View>
          <Text
            className={
              'font-display-medium text-xl text-gray-600 px-4 mt-4 mb-1'
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
                setToken(null)
                reloadAppAsync()
              }}
            >
              <Text
                className={
                  'text-red-600 text-lg font-display-medium text-center'
                }
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
                className={
                  'text-red-600 text-lg font-display-medium text-center'
                }
              >
                Account Deletion Request
              </Text>
            </Pressable>
          </View>
          <Text
            className={
              'font-display-medium text-xl text-gray-600 px-4 mt-4 mb-1'
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
