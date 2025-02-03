import { CreateProgramReturn, GetAccountReturn } from '@backend/types'
import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, View, Text } from 'react-native'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'

import PersonalDetailsDropdown from '~/components/account/customize/PersonalDetailsDropdown'
import PersonalDetailsRow from '~/components/account/customize/PersonalDetailsRow'
import useClient from '~/components/network/client'
import ErrorComponent from '~/components/ui/ErrorComponent'
import LoadingComponent from '~/components/ui/LoadingComponent'

export default function PersonalDetails() {
  const client = useClient()
  const { data: account, isLoading } = useSWR<
    { error: true; message: string } | { error: false; data: GetAccountReturn }
  >(`account`)
  const [weight, setWeight] = useState(
    account?.error ? '0' : account?.data.user?.weight
  )
  const [height, setHeight] = useState<string>(
    account?.error ? '0' : account?.data.user?.height?.toString() || '0'
  )
  const [DOB, setDOB] = useState<string>(
    account?.error ? '0' : account?.data.user?.dateOfBirth?.toString() || '0'
  )
  const [sex, setSex] = useState<Sex>(
    account?.error ? 'M' : account?.data.user?.sex || 'M'
  )
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(
    account?.error
      ? 'sedentary'
      : account?.data.user?.activityLevel || 'sedentary'
  )
  if (!account || isLoading) {
    return (
      <View className="flex flex-col items-center justify-center h-full">
        <LoadingComponent text="Loading..." />
      </View>
    )
  }
  if (account?.error) {
    return (
      <View className="flex flex-col items-center justify-center h-full">
        <ErrorComponent text={account.message} />
      </View>
    )
  }
  return (
    <View className="bg-white flex flex-col">
      <PersonalDetailsRow
        title="Current Weight"
        value={weight || '0'}
        onChangeText={setWeight}
      />
      <PersonalDetailsRow
        title="Height"
        value={height || '0'}
        onChangeText={setHeight}
      />
      <PersonalDetailsRow
        title="Date of Birth"
        value={DOB || '0'}
        onChangeText={setDOB}
      />
      <PersonalDetailsDropdown
        title="Sex"
        value={sex || 'M'}
        options={[
          ['Male', 'M'],
          ['Female', 'F']
        ]}
        onChangeText={setSex}
      />
      <PersonalDetailsDropdown
        title="Activity Level"
        value={activityLevel}
        options={[
          ['Sedentary', 'sedentary'],
          ['Lightly Active', 'lightly_active'],
          ['Moderately Active', 'moderately_active'],
          ['Very Active', 'very_active']
        ]}
        onChangeText={setActivityLevel}
      />
      <Pressable
        className="bg-white rounded-full border-gray-200 border-2 py-2 mb-4"
        onPress={async () => {
          try {

            const res = await client
              .post<
                | { error: false; data: CreateProgramReturn }
                | { error: true; message: string }
              >('programs/fromTemplate', {
                json: {
                  programTemplateId: Number(program)
                }
              })
              .json()

            if (res.error) {
              Toast.show({ type: 'error', text1: res.message })
              return
            }
            Toast.show({ type: 'success', text1: 'Program Started' })
            router.navigate('/nutrical/meals')
          } catch (e) {
            Toast.show({ type: 'error', text1: 'Error', text2: e.message })
          }
        }}
      >
        <Text className="font-display text-lg">Save Changes</Text>
      </Pressable>
    </View>
  )
}

type Sex = 'M' | 'F'
type ActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
