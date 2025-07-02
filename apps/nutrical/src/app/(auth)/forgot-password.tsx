import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResetRequest = async () => {
    if (!email) {
      return Toast.show({ type: 'error', text1: 'Please enter your email' })
    }
    setLoading(true)
    // TODO: Implement actual password reset API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    Toast.show({
      type: 'success',
      text1: 'Reset Link Sent',
      text2: 'Check your email for instructions.'
    })
    router.back()
  }

  return (
    <SafeAreaView className={'flex-1 bg-gray-50'}>
      <View className={'px-4'}>
        <Pressable
          className={'self-start p-2'}
          onPress={() => {
            router.back()
          }}
        >
          <ChevronLeft
            size={24}
            color={'#1F2937'}
          />
        </Pressable>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className={'flex-1'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps={'handled'}
          className={'px-6'}
        >
          <View>
            <View className={'items-center'}>
              <Text className={'font-display-bold text-gray-900 text-3xl mb-2'}>
                Forgot Password?
              </Text>
              <Text
                className={'font-display text-center text-gray-600 text-base'}
              >
                No worries, we'll send you reset instructions.
              </Text>
            </View>

            <View className={'mt-8'}>
              <View className="mb-6">
                <Text
                  className={'font-display-medium text-gray-700 text-sm mb-2'}
                >
                  Email Address
                </Text>
                <TextInput
                  className={
                    'p-3 bg-white border-gray-300 border rounded-lg w-full h-12 font-display text-base text-gray-900'
                  }
                  placeholder={'you@example.com'}
                  placeholderTextColor={'#9CA3AF'}
                  textAlign={'left'}
                  keyboardType={'email-address'}
                  onChangeText={setEmail}
                  textContentType={'emailAddress'}
                  autoComplete={'email'}
                  autoCapitalize={'none'}
                />
              </View>
            </View>

            <View className={'mt-2'}>
              <Pressable
                onPress={handleResetRequest}
                disabled={loading}
                className={
                  'w-full items-center justify-center rounded-lg h-12 bg-green-600 shadow disabled:bg-green-400'
                }
              >
                <Text className={'font-display-semibold text-base text-white'}>
                  Send Reset Link
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
