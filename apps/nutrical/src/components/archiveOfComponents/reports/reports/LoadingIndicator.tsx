import { ActivityIndicator, Text, View } from 'react-native'

export default function LoadingIndicator() {
  return (
    <View
      className={
        'mx-4 mb-10 rounded-3xl bg-white shadow-2xl flex flex-row items-center justify-center h-96'
      }
    >
      <Text className={'font-display mr-4 text-lg'}>Loading ..</Text>
      <ActivityIndicator />
    </View>
  )
}
