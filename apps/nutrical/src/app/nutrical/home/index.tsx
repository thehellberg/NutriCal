import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Image } from 'expo-image'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'

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
    <SafeAreaView className="bg-white">
      <ScrollView className="h-full pb-20">
        <Text
          className={'text-md font-display text-gray-600 self-start mx-4 mt-6'}
        >
          WEDNESDAY, 21 AUGUST
        </Text>
        <Text
          className={'text-4xl font-display-medium self-start mx-4 mb-2 mt-0.5'}
        >
          Dashboard
        </Text>
        <ScrollView
          horizontal
          className={'pb-4'}
          pagingEnabled
        >
          <View
            className={'bg-white flex flex-col items-start w-screen px-4 pt-2'}
          >
            <Text className={'text-2xl font-display-medium'}>
              Food Log Focus
            </Text>
            <View
              className={
                'flex flex-row items-center justify-evenly w-full mt-8'
              }
            >
              <FoodLogFocusText remaining={1281} />

              <ProgressCircle
                {...data}
                strokeWidth={6}
                radius={70}
              />
              <FoodLogFocusText remaining={1281} />
            </View>
            <View className={'w-full flex flex-row px-6 py-3 justify-between'}>
              <MainMealStat
                type={'Carbohydrates'}
                value={10}
                limit={136}
                color={'emerald-700'}
              />
              <MainMealStat
                type={'Fats'}
                value={10}
                limit={40}
                color={'blue-800'}
              />
              <MainMealStat
                type={'Proteins'}
                value={10}
                limit={77}
                color={'yellow-500'}
              />
            </View>
          </View>
          <View
            className={
              'bg-white flex flex-col items-center justify-center w-screen px-4 py-2'
            }
          >
            <Text className={'text-2xl font-display-medium'}>
              More cards Coming Soon!
            </Text>
          </View>
        </ScrollView>
        <Text className={'text-blue-700 hidden'}></Text>
        <Text className={'text-yellow-500 hidden'}></Text>
        <View
          className={
            'flex flex-col justify-evenly items-start w-screen bg-gray-50 px-4'
          }
        >
          <Text className={'text-2xl font-display-medium mt-4 mb-2'}>
            Insights
          </Text>
          <View className="flex flex-1 flex-row justify-center items-center w-full gap-4">
            <View
              className={
                'bg-white rounded-lg py-4 px-4 basis-1/2 flex flex-col justify-center items-center flex-shrink h-full'
              }
            >
              <Text className={'font-display-medium text-xl self-start'}>
                Steps
              </Text>
              <Image
                source={
                  'https://developer.apple.com/assets/elements/icons/healthkit/healthkit-128x128_2x.png'
                }
                className="w-16 h-16"
                contentFit="contain"
              />
              <Text className={'font-display text-md mt-2'}>
                Support for tracking steps and exercise wil be added with Apple
                healthkit
              </Text>
              {/* 
              <View className={'flex flex-row items-center'}>
              <Footprints />
              <Text className={'font-semibold text-lg'}>43</Text>
              </View>
              <Text className={'font-display my-1'}>Goal: 10,000 Steps</Text>
              <View className={'relative h-4 mx-1'}>
              <View
              className={'absolute bg-slate-300 w-full rounded-full h-2'}
              ></View>
              <View
              style={{ width: '80%' }}
              className={'absolute bg-green-500 rounded-full h-2 z-10'}
              ></View> 
              </View>*/}
            </View>
            <View
              className={
                'bg-white rounded-lg py-2 px-4 basis-1/2 flex-shrink flex flex-col justify-center items-center'
              }
            >
              <Text
                className={'font-display-medium text-xl mb-auto self-start'}
              >
                Water
              </Text>

              <WaterCircle
                {...waterData}
                strokeWidth={6}
                radius={50}
              />
              <View
                className={
                  'flex flex-row items-center bg-gray-100 p-0.5 rounded'
                }
              >
                <MaterialIcons
                  name={'remove'}
                  size={24}
                  color={'#2563eb'}
                  className="m-0.5"
                />
                <View className="h-full w-1 bg-gray-300 rounded-full m-0.5"></View>
                <MaterialIcons
                  name={'add'}
                  size={24}
                  color={'#2563eb'}
                  className="m-0.5"
                />
              </View>
            </View>
          </View>
          <View className={'flex flex-row items-start w-full mt-4'}>
            <View
              className={
                'bg-white rounded-lg items-start py-2 px-4 basis-full h-28'
              }
            >
              <Text className={'font-display-medium text-xl self-start'}>
                Weight
              </Text>
              <View
                className={
                  'bg-gray-200 h-32 w-full rounded-lg mt-2 flex items-center justify-center'
                }
              >
                <Text className={'font-display text-lg'}>Chart here</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
