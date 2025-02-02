import { ActivityIndicator, Text, View } from 'react-native'

export default function LoadingComponent(props: { text: string }) {
  return (
    <View
      className={
        'bg-white p-4 rounded-lg m-4 flex flex-row justify-center items-center'
      }
    >
      <ActivityIndicator size="large" color="#2563eb" />
      <Text className={'font-display text-lg'}>{props.text}</Text>
    </View>
  )
}
