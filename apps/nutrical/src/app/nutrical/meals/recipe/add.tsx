import { FlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { ChevronLeft, CirclePlus, ScanBarcode } from 'lucide-react-native'
import { useEffect } from 'react'
import { ScrollView, View, Text, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'

import type { Recipes, TrackRecipeReturn } from '@backend/types'

import useClient from '~/components/network/client'
import ProgressBar from '~/components/ui/ProgressBar'
export default function RecipeAdd() {
  const { meal, selectedDay, programId } = useLocalSearchParams<{
    meal?: string
    selectedDay?: string
    programId?: string
  }>()

  const { data: recipeData } = useSWR<
    { error: false; data: Recipes } | { error: true; message: string }
  >('recipes')
  useEffect(() => {
    if (recipeData?.error) {
      Toast.show({ type: 'error', text1: 'Error', text2: recipeData.message })
    }
  }, [recipeData])
  const recipes = recipeData?.error ? undefined : recipeData?.data

  const client = useClient()

  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="h-full">
        <View className="flex flex-col w-screen p-4">
          <View className="flex flex-row justify-between items-center mb-4">
            <Pressable onPress={() => router.back()}>
              <ChevronLeft
                size={32}
                className="self-start justify-self-start"
              />
            </Pressable>
            <Text className="text-xl font-display">{meal || 'Add Recipe'}</Text>
            <View className="w-8"></View>
          </View>
          <View className="flex flex-row items-center">
            <TextInput
              className="flex-grow bg-gray-100 rounded-lg pb-2 pt-1 px-2 mr-4 font-display text-lg align-middle"
              placeholder="Search (Not Implemented)"
            />
            <ScanBarcode className="p-4" />
          </View>
        </View>
        <View className="bg-gray-100 w-screen">
          <View className="m-4 rounded-lg bg-white flex flex-col">
            <View className="flex flex-col p-4">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-lg font-display-medium">
                  Daily Intake
                </Text>
                <Text className="text-md font-display">84 / 1804 kcal</Text>
              </View>
              <ProgressBar
                limit={1804}
                value={84}
                color="#000000"
              />
            </View>
            <View className="flex flex-row p-4 gap-8">
              <View className="flex flex-col basis-1/3 justify-center items-center flex-grow-0 flex-shrink">
                <Text className="text-md font-display">Carbs</Text>
                <ProgressBar
                  color="#000"
                  value={12}
                  limit={226}
                />
                <Text className="text-sm font-display">12 / 226 g</Text>
              </View>
              <View className="flex flex-col basis-1/3 justify-center items-center flex-grow-0 flex-shrink">
                <Text className="text-md font-display">Protein</Text>
                <ProgressBar
                  color="#000"
                  value={8}
                  limit={90}
                />
                <Text className="text-sm font-display">8 / 90 g</Text>
              </View>
              <View className="flex flex-col basis-1/3 justify-center items-center flex-grow-0 flex-shrink">
                <Text className="text-md font-display">Fat</Text>
                <ProgressBar
                  color="#000"
                  value={0}
                  limit={60}
                />
                <Text className="text-sm font-display">0 / 60 g</Text>
              </View>
            </View>
          </View>
          <FlashList
            className="w-screen"
            data={recipes}
            renderItem={({ item }) => (
              <View className="flex flex-row p-4 items-center justify-between bg-white rounded-lg m-4">
                <View className="flex flex-row justify-start items-center">
                  <Image
                    source={{ uri: item.photoUrl }}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <View className="flex flex-col">
                    <Text className="text-lg font-display">{item.name}</Text>
                    <Text className="text-sm font-display">{item.notes}</Text>
                  </View>
                </View>
                <Pressable
                  className="p-2"
                  onPress={async () => {
                    console.log('H')

                    const res = await client
                      .post<
                        | { error: false; data: TrackRecipeReturn }
                        | { error: true; message: string }
                      >('recipes/track', {
                        json: {
                          mealName: meal?.toLowerCase(),
                          programId: Number(programId),
                          dayIndex: Number(selectedDay),
                          recipeId: item.id
                        }
                      })
                      .json()
                    if (res.error) {
                      Toast.show({
                        type: 'Error',
                        text1: res.message
                      })
                      return
                    }
                    Toast.show({
                      type: 'success',
                      text1: 'Recipe Added'
                    })
                    router.navigate('/nutrical/meals')
                  }}
                >
                  <CirclePlus size={24} />
                </Pressable>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
