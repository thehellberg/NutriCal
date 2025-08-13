import { router } from 'expo-router'
import { ChevronRight } from 'lucide-react-native'
import { Pressable, Text, View } from 'react-native'

export default function CommentHeader() {
  return (
    <View className={'w-screen h-10 border-b border-gray-200 flex flex-row'}>
      <Pressable
        className={'px-5 py-1'}
        onPress={router.back}
      >
        <ChevronRight />
      </Pressable>
      <View className={'flex flex-row justify-center items-center -mt-2'}>
        <View className={'flex flex-col items-center ml-2'}>
          <Text className={'font-TajawalMedium text-lg'}>التعليقات</Text>
        </View>
      </View>
    </View>
  )
}
