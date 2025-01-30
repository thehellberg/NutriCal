import { ProgramTemplates } from '@backend/types'
import { FlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'
import { View, Text, Pressable } from 'react-native'

import FeaturedProgram from './FeaturedProgram'

export default function FeaturedPrograms(props: {
  programs: ProgramTemplates
}) {
  return (
    <View className="flex-1 bg-green-800">
      <View className="h-80 overflow-hidden absolute top-0 left-0 w-screen">
        <Image
          source={
            'https://cdn.lifesum.com/media/plans/plans/featured_images/topfeature_3wwl-6a82e52cf0654d5ea38d7c7b75768d55-3x.png'
          }
          contentPosition={'right bottom'}
          contentFit="contain"
          className="w-full h-[400px]"
        />
      </View>
      <FlashList
        data={props.programs}
        renderItem={({ item }) => (
          <FeaturedProgram
            id={item.id}
            name={item.name}
            description={item.description || ''}
          />
        )}
        horizontal
        className={'pb-4 h-80'}
        pagingEnabled
        ListFooterComponent={() => (
          <View className="flex flex-col items-start justify-center w-screen h-full px-4 pt-2">
            <Text className="font-display-medium text-3xl text-white mb-8">
              Find your plan
            </Text>
            <View className="flex flex-col gap-4">
              <Pressable className="bg-transparent border border-white rounded-full p-2">
                <Text className="text-white font-display text-center">
                  Take a test
                </Text>
              </Pressable>

              <Pressable className="bg-transparent border border-white rounded-full p-2">
                <Text className="text-white font-display text-center">
                  Build your own
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      ></FlashList>
    </View>
  )
}
