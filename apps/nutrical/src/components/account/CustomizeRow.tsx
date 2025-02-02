import { ChevronRight } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

export default function CustomizeRow(props: {
  title: string
  children: React.ReactNode
}) {
  return (
    <View className={'flex flex-row items-center w-full justify-between'}>
      <View className={'flex flex-row items-center'}>
        {props.children}
        <Text className={'font-display text-lg pt-1 ml-2'}>{props.title}</Text>
      </View>
      <ChevronRight className={'w-6 h-6'} />
    </View>
  )
}
