import { Text, View } from 'react-native'
export default function NutritionalInformationRow(props: {
  label: string
  value: string
}) {
  return (
    <View className="flex flex-row justify-between items-center my-0.5">
      <Text className="text-lg font-display-medium text-left">
        {props.label}
      </Text>
      <Text className="text-lg font-display-medium text-right">
        {props.value}
      </Text>
    </View>
  )
}
