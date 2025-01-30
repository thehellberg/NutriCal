import { Text, View } from 'react-native'

export default function InfoComponent(props: { title: string; value: string }) {
  return (
    <View className={'flex flex-row justify-between mt-2'}>
      <Text className={'font-display text-lg'}>{props.title}</Text>
      <Text className={'font-display-bold text-lg'}>{props.value}</Text>
    </View>
  )
}
