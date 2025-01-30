import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Text, View } from 'react-native'

export default function FirstCard(props: {
  title: string
  subtitle: string
  icon: keyof typeof MaterialIcons.glyphMap
  color: string
}) {
  return (
    <View className={'flex flex-row items-center my-1.5'}>
      <MaterialIcons
        name={props.icon}
        size={24}
        color={props.color}
      />
      <View className={'items-start'}>
        <Text className={'text-gray-600 font-display'}>{props.title}</Text>
        <Text className={'font-bold'}>{props.subtitle}</Text>
      </View>
    </View>
  )
}
