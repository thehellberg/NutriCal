import { Text, View } from 'react-native'
export default function NutritionalInformationSubRow(props: {
  label: string
  value: string
}) {
  return (
    <View className="flex flex-row justify-between items-center my-0.5">
      <Text className="text-lg font-display text-left ml-4">{props.label}</Text>
      <Text className="text-lg font-display text-right">{props.value}</Text>
    </View>
  )
}
