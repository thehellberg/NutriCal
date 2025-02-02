import { GetAccountReturn } from '@backend/types'
import { useState } from 'react'
import { View } from 'react-native'
import useSWR from 'swr'

import PersonalDetailsDropdown from '~/components/account/customize/PersonalDetailsDropdown'
import PersonalDetailsRow from '~/components/account/customize/PersonalDetailsRow'
import ErrorComponent from '~/components/ui/ErrorComponent'
import LoadingComponent from '~/components/ui/LoadingComponent'

export default function PersonalDetails() {
  const { data: account, isLoading } = useSWR<
    { error: true; message: string } | { error: false; data: GetAccountReturn }
  >(`account`)
  const [weight, setWeight] = useState(
    account?.error ? '0' : account?.data.user?.weight
  )
  const [height, setHeight] = useState(
    account?.error ? '0' : account?.data.user?.weight
  )
  const [DOB, setDOB] = useState(
    account?.error ? '0' : account?.data.user?.weight
  )
  const [sex, setSex] = useState(
    account?.error ? '0' : account?.data.user?.weight
  )
  const [activityLevel, setActivityLevel] = useState(
    account?.error ? '0' : account?.data.user?.weight
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
      {/* <PersonalDetailsDropdown /> */}
      <PersonalDetailsRow
        title="Activity Level"
        value={activityLevel || '0'}
        onChangeText={setActivityLevel}
      />
    </View>
  )
}
