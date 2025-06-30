import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, View, Text, Platform, ScrollView } from 'react-native'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'

import type {
  Activity_Level,
  GetAccountReturn,
  PatchUserReturn
} from '@backend/types'

import PersonalDetailsDropdown from '~/components/account/customize/PersonalDetailsDropdown'
import PersonalDetailsRow from '~/components/account/customize/PersonalDetailsRow'
import useClient from '~/components/network/client'
import ErrorComponent from '~/components/ui/ErrorComponent'
import LoadingComponent from '~/components/ui/LoadingComponent'

type ActivityLevel = `${Activity_Level}`
export default function PersonalDetails() {
  const client = useClient()
  const { data: account, isLoading } = useSWR<
    { error: true; message: string } | { error: false; data: GetAccountReturn }
  >(`account`)
  const [weight, setWeight] = useState<string>(
    account?.error ? '0' : account?.data.user?.weight || ''
  )
  const [height, setHeight] = useState<string>(
    account?.error ? '0' : account?.data.user?.height?.toString() || ''
  )
  const [DOB, setDOB] = useState<string>(
    account?.error ? '0' : account?.data.user?.dateOfBirth?.toString() || '0'
  )
  const [sex, setSex] = useState<Sex>(
    account?.error ? 'M' : account?.data.user?.sex || 'M'
  )
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(
    account?.error ? 'bmr' : account?.data.user?.activityLevel || 'bmr'
  )

  //Android Report Date Picker
  const showMode = () => {
    DateTimePickerAndroid.open({
      value: new Date(DOB),
      onChange: onChange,
      mode: 'date',
      is24Hour: true
    })
  }

  //iOS report Date picker
  const onChange = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setDOB(selectedDate?.toISOString() || new Date().toISOString())
  }

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
    <ScrollView
      className="bg-white flex flex-col h-full"
      keyboardDismissMode="on-drag"
    >
      <PersonalDetailsRow
        title="Current Weight"
        value={weight || ''}
        unit="kg"
        onChangeText={setWeight}
      />
      <Border />
      <PersonalDetailsRow
        title="Height"
        value={height || ''}
        unit="cm"
        onChangeText={setHeight}
      />
      <Border />
      <View className="flex flex-row items-center justify-between p-4">
        <Text className="font-display text-lg">Date of Birth</Text>
        <View className="flex flex-row items-center">
          {Platform.OS === 'ios' && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(DOB)}
              mode={'date'}
              onChange={onChange}
            />
          )}
          {Platform.OS === 'android' && (
            <Pressable
              onPress={showMode}
              className={'bg-gray-200 p-2 rounded-lg'}
            >
              <Text className={'font-display text-lg'}>
                {DOB ? new Date(DOB).toDateString() : 'Select Date'}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
      <Border />
      <PersonalDetailsDropdown
        title="Sex"
        value={sex || 'M'}
        options={[
          ['Male', 'M'],
          ['Female', 'F']
        ]}
        onChangeText={setSex}
      />
      <Border />
      <PersonalDetailsDropdown
        title="Activity Level"
        value={activityLevel}
        options={[
          ['BMR', 'bmr'],
          ['Sedentary', 'sedentary'],
          ['Lightly Active', 'lightly_active'],
          ['Moderately Active', 'moderately_active'],
          ['Active', 'active'],
          ['Very Active', 'very_active'],
          ['Extra Active', 'extra_active']
        ]}
        onChangeText={setActivityLevel}
      />
      <Border />
      <Pressable
        className="bg-white rounded-full border-gray-200 border-2 py-2 mx-auto px-4 mt-8"
        onPress={async () => {
          try {
            const res = await client
              .patch<
                | { error: false; data: PatchUserReturn }
                | { error: true; message: string }
              >('users', {
                json: {
                  sex,
                  weight: parseFloat(weight),
                  height: parseFloat(height),
                  dateOfBirth: DOB,
                  activityLevel
                }
              })
              .json()

            if (res.error) {
              Toast.show({ type: 'error', text1: res.message })
              return
            }
            Toast.show({
              type: 'success',
              text1: 'Details Updated Successfully'
            })
            router.back()
          } catch (e) {
            Toast.show({ type: 'error', text1: 'Error', text2: e.message })
          }
        }}
      >
        <Text className="font-display text-lg">Save Changes</Text>
      </Pressable>
    </ScrollView>
  )
}

type Sex = 'M' | 'F'

const Border = () => <View className={'h-0.5 bg-gray-50'} />
