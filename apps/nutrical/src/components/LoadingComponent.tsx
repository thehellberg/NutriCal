import { Text, View } from 'react-native'

export default function LoadingComponent(props: { text: string }) {
  return (
    <View
      className={
        'bg-white p-4 rounded-lg m-4 flex flex-col justify-center items-center'
      }
    >
      <Text className={'font-display text-lg'}>{props.text}</Text>
    </View>
  )
}
