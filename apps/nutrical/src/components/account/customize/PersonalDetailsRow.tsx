import { View, Text, TextInput } from 'react-native'

export default function PersonalDetailsRow(props: {
  title: string
  value: string
  onChangeText: (text: string) => void
}) {
  return (
    <View className="flex flex-row items-center justify-between p-4">
      <Text className="font-display text-lg">{props.title}</Text>
      <View className="flex flex-row items-center">
        <TextInput className="font-display-medium text-lg border border-black h-10 w-10 text-center rounded border-solid" value={props.value} onChangeText={props.onChangeText} />
        <Text className="font-display-medium text-lg"> kg</Text>
      </View>
    </View>
  )
}
