import { View, Text, TextInput } from 'react-native'

export default function PersonalDetailsRow(props: {
  title: string
  unit: string
  value: string
  onChangeText: (text: string) => void
}) {
  return (
    <View className="flex flex-row items-center justify-between p-4">
      <Text className="font-display text-lg">{props.title}</Text>
      <View className="flex flex-row items-center justify-between w-28">
        <TextInput
          className="font-display-medium text-lg border-b-2 border-gray-300 h-10 w-20 text-center rounded border-solid"
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType="numeric"
        />
        <Text className="font-display-medium text-lg"> {props.unit}</Text>
      </View>
    </View>
  )
}
