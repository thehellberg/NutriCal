import { captureException } from '@sentry/react-native'
import { reloadAppAsync } from 'expo'
import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { useState } from 'react'
import {
  Pressable,
  TextInput,
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'

import useClient from '~/components/network/client'
import { useStorageState } from '~/hooks/useStorageState'
import { Session } from '~/types'

//TODO: Add A Proper SSO Implementation
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginDisable, setLoginDisable] = useState(false)

  const [, setToken] = useStorageState('token')
  const client = useClient()

  const { mutate } = useSWR(
    'auth/login',
    async (url) => {
      return await client
        .post<
          | { error: false; data: { token: string; session: Session } }
          | { error: true; message: string }
        >(url, {
          json: { email, password }
        })
        .json()
    },
    { revalidateOnFocus: false, shouldRetryOnError: false }
  )

  const handleSignIn = async () => {
    try {
      setLoginDisable(true)
      const result = await mutate()
      if (result?.error) {
        return Toast.show({ type: 'error', text1: result.message })
      }
      if (result?.data.token) {
        setToken(result.data.token)
        reloadAppAsync()
      } else {
        Toast.show({ type: 'error', text1: 'Login failed' })
      }
    } catch (err) {
      captureException(err)
      Toast.show({ type: 'error', text1: 'Unknown Error' })
    } finally {
      setLoginDisable(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={'flex h-full pt-4'}
      //keyboardVerticalOffset={Number(navbarHeight)}
    >
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        className={''}
      >
        <SafeAreaView
          className={'flex flex-col items-center justify-center w-full'}
        >
          {/*<Image source={logo} className={"h-16 w-40 items-center"} contentFit={"contain"}/>*/}
          <View className={'flex flex-col items-center w-screen px-8'}>
            <View
              className={'flex flex-col items-start justify-start self-start'}
            >
              <Pressable
                className={' p-4 -ml-6 -mt-5'}
                onPress={() => {
                  router.back()
                }}
              >
                <ChevronLeft size={24} />
              </Pressable>
              <View className={'flex flex-col justify-start items-center'}>
                <Text
                  className={'font-display-bold text-left text-2xl self-start'}
                >
                  Login
                </Text>
                <Text
                  className={
                    'font-display-medium text-gray-500 text-left text-md self-start mb-5'
                  }
                >
                  Continue with your account
                </Text>
              </View>
            </View>
            <Text
              className={
                'font-display-medium text-left text-lg self-start mt-2'
              }
            >
              Email Address
            </Text>
            <TextInput
              className={
                'pt-2 px-2 bg-white border-gray-400 border rounded-lg w-full h-12 font-display text-lg'
              }
              textAlign={'left'}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                setEmail(text)
              }}
              textContentType={'emailAddress'}
              autoComplete={'email'}
            />

            <Text
              className={
                'font-display-medium text-left text-lg self-start mt-2'
              }
            >
              Password
            </Text>
            <TextInput
              className={
                'pt-2 px-4 bg-white border-gray-400 border rounded-lg w-full h-12 font-display text-lg'
              }
              textAlign={'left'}
              onChangeText={(text) => {
                setPassword(text)
              }}
              textContentType={'password'}
              autoComplete={'password'}
              secureTextEntry
            />
          </View>

          <Pressable
            onPress={handleSignIn}
            disabled={loginDisable}
            className={
              'pb-2 px-2 bg-green-600 rounded-lg shadow self-center mt-4'
            }
          >
            <Text
              className={
                'font-display-medium text-left text-lg self-start mt-2 text-white'
              }
            >
              Login
            </Text>
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
