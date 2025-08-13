import { addDays, differenceInDays, format } from 'date-fns'
import { ChevronDown, ChevronLeft } from 'lucide-react-native'
import { useState, useEffect, useMemo } from 'react'
import {
  Pressable,
  ScrollView,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'

import type { UserPrograms } from '@backend/types'

import Border from '~/components/account/Border'
import MealSection from '~/components/meals/MealSection'

export default function Meals() {
  const [calRemaining, setCalRemaining] = useState(0)
  const calTotal = 1600
  const data = {
    data: [0, 0, calRemaining / calTotal]
  }
  // Current date
  const currentDate = useMemo(() => new Date(), [])

  // Calculate days passed
  const [daysPassed, setDaysPassed] = useState(1)
  const [toggleInstructions, setToggleInstructions] = useState(false)
  const [programState, setProgramState] = useState<
    'NoInstructions' | 'NotFound'
  >()

  const weekDays = [1, 2, 3, 4, 5, 6, 7]
  const [referenceDay, setReferenceDay] = useState(new Date())
  const [currentMeal, setCurrentMeal] =
    useState<UserPrograms[number]['programFoods'][number]['food']>()

  const { data: programData } = useSWR<
    { error: false; data: UserPrograms } | { error: true; message: string }
  >('programs')
  useEffect(() => {
    if (programData?.error) {
      setProgramState('NotFound')
      Toast.show({ type: 'error', text1: 'Error' })
    }
  }, [programData?.error])
  const programs = programData?.error ? undefined : programData?.data

  // Set daysPassed and referenceDay once when programs changes
  useEffect(() => {
    if (programs && programs.length > 0) {
      const referenceDate = new Date(programs[0]?.startDate || currentDate)
      setDaysPassed(differenceInDays(currentDate, referenceDate) + 1)
      setReferenceDay(referenceDate)
    }
  }, [programs, currentDate])

  return (
    <SafeAreaView className={' h-screen pb-14'}>
      <ScrollView>
        <Text
          className={'text-4xl font-display-medium self-start mx-4 mb-2 mt-8'}
        >
          Meals
        </Text>
        {programs ? (
          <View>
            <Text
              className={
                'self-start font-display-bold text-gray-600 text-2xl mt-2 mx-4'
              }
            >
              Day
            </Text>
            <FlatList
              className={'flex flex-row w-screen'}
              contentContainerStyle={{
                justifyContent: 'space-evenly',
                flex: 1
              }}
              horizontal
              data={weekDays}
              scrollEnabled={false}
              renderItem={({ item }) =>
                item === daysPassed ? (
                  <View
                    className={
                      'flex flex-col bg-emerald-500 rounded-3xl pt-3 pb-2 items-center px-2'
                    }
                  >
                    <Text
                      allowFontScaling={false}
                      className={'text-white font-display-bold mb-0.5'}
                    >
                      {format(addDays(referenceDay, item - 1), 'E')}
                    </Text>
                    <View className={'bg-white rounded-full p-1 w-8'}>
                      <Text
                        allowFontScaling={false}
                        className={'font-display-bold text-center'}
                      >
                        {format(addDays(referenceDay, item - 1), 'd')}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Pressable
                    className={
                      'flex flex-col rounded-3xl pt-3 pb-2 items-center px-2'
                    }
                    onPress={() => {
                      setDaysPassed(item)
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      className={'text-black font-display-bold mb-0.5'}
                    >
                      {format(addDays(referenceDay, item - 1), 'E')}
                    </Text>
                    <View className={'w-8 rounded-full p-1'}>
                      <Text
                        allowFontScaling={false}
                        className={'font-display-bold text-center'}
                      >
                        {format(addDays(referenceDay, item - 1), 'd')}
                      </Text>
                    </View>
                  </Pressable>
                )
              }
              extraData={daysPassed}
            />
            {/* 
                               <Text className={"self-start font-display-bold text-gray-600 text-lg mt-2"}></Text>
                        <View className={"flex flex-col justify-center items-center bg-white shadow rounded-lg"}>
                        <View className={" mx-4 flex flex-row items-center justify-between mt-2 px-8"}>
                        <View className={"flex flex-col justify-center items-center gap-1"}>
                        <Text className={"text-lg font-bold"}>279</Text>
                        <Text className={"font-display-medium text-gray-600"}></Text>
                        </View>
                        <View className={"relative flex flex-col items-center justify-center"}>
                        <View className={"absolute z-10 items-center"}>
                        <Text className={"text-3xl font-bold"}>1672</Text>
                        <Text className={"text-gray-600 font-display-medium text-base w-24 text-center"}></Text>
                        </View>
                        <ProgressChart
                        data={data}
                        width={200}
                        height={200}
                        strokeWidth={6}
                        radius={30}
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(5,150,105, ${opacity})`,
                            }}
                            hideLegend={true}
                            className={""}
                            />
                            </View>
                            <View className={"flex flex-col justify-center items-center gap-1"}>
                            <Text className={"text-lg font-bold"}>0</Text>
                            <Text className={"font-display-medium text-gray-600"}></Text>
                            </View>
                            </View>
                            <View className={"w-full flex flex-row px-6 py-3 justify-between"}>
                                <MainMealStat type={} value={10} limit={((breakfastMeals.sums.carb + lunchMeals.sums.carb + dinnerMeals.sums.carb + snackMeals.sums.carb) || 0).toFixed(1)} color={"emerald-700"}/>
                                <MainMealStat type={} value={10} limit={((breakfastMeals.sums.fat + lunchMeals.sums.fat + dinnerMeals.sums.fat + snackMeals.sums.fat) || 0).toFixed(1)} color={"blue-800"}/>
                                <MainMealStat type={} value={10} limit={((breakfastMeals.sums.protein + lunchMeals.sums.protein + dinnerMeals.sums.protein + snackMeals.sums.protein) || 0).toFixed(1)} color={"yellow-500"}/>
                                </View>
                                </View>
                                <View className={"bg-emerald-700"}></View>
                                <View className={"bg-blue-800"}></View>
                                <View className={"bg-yellow-500"}></View> */}

            <Text
              className={
                'self-start font-display-bold text-gray-600 text-2xl mt-4 -mb-1 mx-4'
              }
            >
              Meals
            </Text>
            {programs.length > 0 && (
              <View className={'flex flex-col mx-4'}>
                <MealSection
                  selectedDay={daysPassed}
                  program={programs[0]}
                  title={'Breakfast'}
                />
                <MealSection
                  selectedDay={daysPassed}
                  program={programs[0]}
                  title={'Lunch'}
                />
                <MealSection
                  selectedDay={daysPassed}
                  program={programs[0]}
                  title={'Dinner'}
                />
                <MealSection
                  selectedDay={daysPassed}
                  program={programs[0]}
                  title={'Snack'}
                />
                <MealSection
                  selectedDay={daysPassed}
                  program={programs[0]}
                  title={'Functional Food'}
                />

                {programs[0]?.instructions && (
                  <View
                    className={
                      'flex flex-col bg-white rounded-lg py-2 px-4 my-2'
                    }
                  >
                    <Pressable
                      onPress={() => {
                        setToggleInstructions(!toggleInstructions)
                      }}
                      className={
                        'flex flex-row items-center justify-between w-full'
                      }
                    >
                      <View className={' ml-2 flex flex-col py-2'}>
                        <Text className={'font-display-medium text-lg'}>
                          {'Instructions'}
                        </Text>
                      </View>
                      {toggleInstructions ? (
                        <ChevronDown color={'#a9afab'} />
                      ) : (
                        
                        <ChevronLeft color={'#a9afab'} />
                      )}
                    </Pressable>
                    {toggleInstructions && (
                      <View>
                        <Border />
                        <Text className={'font-display text-base text-left'}>
                          {programs[0]?.instructions}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
        ) : (
          <View
            className={
              'mx-4 mb-10 rounded-3xl bg-white shadow-2xl flex flex-row items-center justify-center h-96'
            }
          >
            {programState === 'NotFound' ? (
              <Text className={'font-display mr-4 text-lg'}>
                No Program Found
              </Text>
            ) : (
              <View className={'flex flex-row items-center justify-center'}>
                <Text className={'font-display mr-4 text-lg'}>Loading</Text>
                <ActivityIndicator />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
/*
                <View className={"relative bg-emerald-500 flex flex-col justify-around w-screen items-center justify-center"}>
                    <Text className={"z-10 text-white font-display text-xl w-24 absolute text-center"}><Text className={"text-2xl"}>1672</Text> kcal/Text>
                    <ProgressChart
                        data={data}
                        width={220}
                        height={220}
                        strokeWidth={6}
                        radius={28}
                        chartConfig={{
                            backgroundColor: "#10b981",
                            backgroundGradientFrom: "#10b981",
                            backgroundGradientTo: "#10b981",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        hideLegend={true}
                        className={""}
                    />
                </View>
 */
/*
<View className={" rounded-full bg-teal-300"}>
                    <MaterialIcons name={"add"} size={32} color={"#0f766e"}/>
                </View>*/
