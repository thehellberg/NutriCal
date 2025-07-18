import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { format } from 'date-fns'
import { Image } from 'expo-image'
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'

import FoodLogFocusText from '~/components/home/FoodLogFocusText'
import ProgressCircle from '~/components/home/ProgressCircle'
import WaterCircle from '~/components/home/WaterCircle'
import MainMealStat from '~/components/meals/MainMealStat'
export const data = {
  data: [0.4]
}
const waterData = {
  data: [0.3]
}
export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="h-full"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-6 pt-6">
          <Text
            className={'font-display text-gray-600 text-base self-start mb-1'}
          >
            {format(new Date(), 'EEEE, d LLLL').toUpperCase()}
          </Text>
          <Text
            className={
              'text-3xl font-display-bold text-gray-900 self-start mb-6'
            }
          >
            Dashboard
          </Text>

          {/* Food Log Focus Card */}
          <View
            className={
              'bg-white border border-gray-300 rounded-lg p-4 w-full mb-6'
            }
          >
            <Text className={'text-xl font-display-semibold text-gray-900'}>
              Calorie Goal
            </Text>
            <View
              className={
                'flex flex-row items-center justify-around w-full mt-4'
              }
            >
              <FoodLogFocusText remaining={1281} />
              <ProgressCircle
                {...data}
                strokeWidth={8}
                radius={70}
              />
              <FoodLogFocusText remaining={1281} />
            </View>
            <View
              className={'w-full flex flex-row px-2 pt-4 pb-2 justify-between'}
            >
              <MainMealStat
                type={'Carbs'}
                value={10}
                limit={136}
                color={'emerald-700'}
              />
              <MainMealStat
                type={'Fat'}
                value={10}
                limit={40}
                color={'blue-800'}
              />
              <MainMealStat
                type={'Protein'}
                value={10}
                limit={77}
                color={'yellow-500'}
              />
            </View>
          </View>

          {/* Insights Section */}
          <Text
            className={
              'text-xl font-display-semibold text-gray-900 self-start mb-3'
            }
          >
            Insights
          </Text>

          <View className="flex flex-row w-full gap-4 mb-4">
            {/* Steps Card */}
            <View
              className={
                'bg-white border border-gray-300 rounded-lg p-4 flex-1 flex-col justify-between'
              }
            >
              <Text className={'font-display-semibold text-lg text-gray-900'}>
                Steps
              </Text>
              <View className="items-center justify-center flex-1 my-2">
                <Image
                  source={
                    'https://developer.apple.com/assets/elements/icons/healthkit/healthkit-128x128_2x.png'
                  }
                  className="w-16 h-16"
                  contentFit="contain"
                />
              </View>
              <Text className={'font-display text-sm text-gray-600'}>
                Apple Health integration coming soon.
              </Text>
            </View>

            {/* Water Card */}
            <View
              className={
                'bg-white border border-gray-300 rounded-lg p-4 flex-1 flex-col'
              }
            >
              <Text className={'font-display-semibold text-lg text-gray-900'}>
                Water
              </Text>
              <View className="items-center justify-center flex-1 my-2">
                <WaterCircle
                  {...waterData}
                  strokeWidth={6}
                  radius={45}
                />
              </View>
              <View className={'flex flex-row items-center justify-center'}>
                <Pressable className="p-1">
                  <MaterialIcons
                    name={'remove'}
                    size={24}
                    color={'#2563eb'}
                  />
                </Pressable>
                <View className="h-full w-1 bg-gray-300 rounded-full"></View>
                <Pressable className="p-1">
                  <MaterialIcons
                    name={'add'}
                    size={24}
                    color={'#2563eb'}
                  />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Weight Chart Card */}
          <View className={'bg-white border border-gray-300 rounded-lg p-4'}>
            <Text className={'font-display-semibold text-xl text-gray-900'}>
              Weight
            </Text>
            <View className="bg-gray-200 h-32 w-full rounded-lg mt-2 flex items-center justify-center">
              <Text className={'font-display text-lg text-gray-700'}>
                Chart coming soon
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
