import { Text, View } from 'react-native'

export default function LoadingComponent(props: { text: string }) {
  return (
    <View
      className={
        'bg-white p-4 rounded-lg m-4 flex flex-row justify-center items-center'
      }
    >
      <Text className={'font-display text-lg text-red-600'}>{props.text}</Text>
    </View>
  )
}
