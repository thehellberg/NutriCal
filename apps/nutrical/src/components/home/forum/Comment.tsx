import { Image } from 'expo-image'
import { View, Text } from 'react-native'


export default function Comment(props: { name: string; content: string }) {
  return (
    <View className={'flex flex-row items-start justify-start my-1 mx-2'}>
      <Image
        source={require('@assets/icons8-male-user-96.png')}
        className={'h-10 rounded-full w-10'}
      />

      <View
        className={
          ' items-start ml-2 pb-2 px-2 pt-1 bg-white shadow rounded-lg max-w-xs mt-0.5'
        }
      >
        <Text className={'font-TajawalBold mb-1'}>{props.name}</Text>
        <Text className={'font-Tajawal text-left'}>{props.content}</Text>
      </View>
    </View>
  )
}
