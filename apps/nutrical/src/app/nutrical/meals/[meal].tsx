import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

export default function Meal() {
  const { meal } = useLocalSearchParams()

  return (
    <View>
      <View
        className={
          'h-64 w-full bg-emerald-600 bg-gradient-to-r from-green-500 to-emerald-500 flex flex-row items-end p-4'
        }
      >
        <Text className={'text-white font-display-bold text-2xl'}>
          
        </Text>
      </View>
    </View>
  )
}
