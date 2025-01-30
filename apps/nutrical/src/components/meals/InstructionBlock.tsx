import { Text, View } from 'react-native'

export default function InstructionBlock({ desc }) {
  return (
    <View>
      <View className={'flex flex-row justify-between items-center mx-4 my-2'}>
        <View className={'flex flex-col text-right flex-shrink mr-2'}>
          <Text className={'text-base font-display-medium text-left'}>
            {desc}
          </Text>
        </View>
      </View>
    </View>
  )
}
