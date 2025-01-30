import { View, Text } from 'react-native'

export default function FoodLogFocusText(props: { remaining: number }) {
  return (
    <View className={'flex flex-col justify-between items-center'}>
      <Text className={'text-2xl font-display-medium text-center'}>
        {props.remaining}
      </Text>
      <Text className={'text-md font-display text-center'}>Remaining</Text>
    </View>
  )
}
