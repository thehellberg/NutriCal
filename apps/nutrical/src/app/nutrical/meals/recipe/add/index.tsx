import { FlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { CirclePlus, ScanBarcode, Utensils } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator
} from 'react-native'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'

import type { GetFoods, PostTrackFood } from '@backend/types'

import useClient from '~/components/network/client'
import ProgressBar from '~/components/ui/ProgressBar'
import { useStorageState } from '~/hooks/useStorageState'

export default function RecipeAdd() {
  const [[, token]] = useStorageState('token')
  const { meal, selectedDay, programId } = useLocalSearchParams<{
    meal?: string
    selectedDay?: string
    programId?: string
  }>()
  const api = useClient(token)

  // --- Search and Pagination State ---
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [foods, setFoods] = useState<GetFoods>([])
  const [isEnd, setIsEnd] = useState(false)

  // Debounce search term
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 200)
    return () => clearTimeout(handler)
  }, [searchTerm])

  // Fetch foods with SWR using search and page
  const {
    data: foodData,
    isValidating,
    error
  } = useSWR<
    { error: false; data: GetFoods } | { error: true; message: string }
  >(['foods', debouncedSearch, page], async ([, search, pageNum]) => {
    // You may need to adjust the endpoint to accept search and page params
    const params = new URLSearchParams()
    if (typeof search === 'string' && search) params.append('search', search)
    params.append('page', String(pageNum))
    params.append('limit', '20')

    return await api.get(`foods?${params.toString()}`).json()
  })

  // Handle data and pagination
  useEffect(() => {
    if (foodData?.error) {
      Toast.show({ type: 'error', text1: 'Error', text2: foodData.message })
      return
    }
    if (foodData && !foodData.error) {
      if (page === 1) {
        setFoods(foodData.data)
      } else {
        setFoods((prev) => [...prev, ...foodData.data])
      }
      setIsEnd(foodData.data.length < 20)
    }
  }, [foodData, page])

  // Reset foods and page on new search
  useEffect(() => {
    setPage(1)
    setIsEnd(false)
  }, [debouncedSearch])

  const client = useClient(token)

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="h-full"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex flex-col w-full p-4">
          {/* <View className="flex flex-row justify-between items-center mb-4">
            <Pressable
              onPress={() => router.back()}
              className="p-2"
            >
              <ChevronLeft
                size={24}
                color={'#1F2937'}
              />
            </Pressable>
            <Text className="text-xl font-display-semibold text-gray-900">
              {meal || 'Add Food'}
            </Text>
            <View className="w-8" />
          </View> */}
          <View className="flex flex-row items-center px-2">
            <TextInput
              className="flex-grow bg-white border border-gray-300 rounded-lg p-3 h-12 font-display text-base text-gray-900 mr-4"
              placeholder="Search for meals..."
              placeholderTextColor={'#9CA3AF'}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              returnKeyType="search"
              onSubmitEditing={() => {
                setPage(1)
                setIsEnd(false)
              }}
            />
            <Link
              asChild
              href="/nutrical/meals/recipe/barcodeAdd"
            >
              <Pressable>
                <ScanBarcode
                  size={24}
                  color={'#1F2937'}
                />
              </Pressable>
            </Link>
          </View>
        </View>
        <View className="flex-1 bg-gray-50 px-4">
          <View className="mb-4 rounded-lg bg-white flex flex-col border border-gray-200">
            <View className="flex flex-col p-4 border-b border-gray-200">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-lg font-display-medium text-gray-800">
                  Daily Intake
                </Text>
                <Text className="text-md font-display text-gray-600">
                  84 / 1804 kcal
                </Text>
              </View>
              <ProgressBar
                limit={1804}
                value={84}
                color="#10B981"
              />
            </View>
            <View className="flex flex-row p-4 gap-4">
              <View className="flex-1 flex-col items-center">
                <Text className="text-md font-display-medium text-gray-700">
                  Carbs
                </Text>
                <ProgressBar
                  color="#3B82F6"
                  value={12}
                  limit={226}
                />
                <Text className="text-sm font-display text-gray-600">
                  12 / 226 g
                </Text>
              </View>
              <View className="flex-1 flex-col items-center">
                <Text className="text-md font-display-medium text-gray-700">
                  Protein
                </Text>
                <ProgressBar
                  color="#EF4444"
                  value={8}
                  limit={90}
                />
                <Text className="text-sm font-display text-gray-600">
                  8 / 90 g
                </Text>
              </View>
              <View className="flex-1 flex-col items-center">
                <Text className="text-md font-display-medium text-gray-700">
                  Fat
                </Text>
                <ProgressBar
                  color="#F59E0B"
                  value={0}
                  limit={60}
                />
                <Text className="text-sm font-display text-gray-600">
                  0 / 60 g
                </Text>
              </View>
            </View>
          </View>
          <FlashList
            estimatedItemSize={88}
            data={foods}
            onEndReached={() => {
              if (!isEnd && !isValidating) {
                setPage((p) => p + 1)
              }
            }}
            renderItem={({ item }) => (
              <View className="flex flex-row p-4 items-center justify-between bg-white rounded-lg mb-4 border border-gray-200">
                <View className="flex flex-row justify-start items-center flex-1">
                  {item.photoUrl ? (
                    <Image
                      source={{ uri: item.photoUrl || '' }}
                      className="w-12 h-12 rounded-lg mr-4"
                    />
                  ) : (
                    <View className="w-12 h-12 bg-gray-200 rounded-lg mr-4 justify-center items-center">
                      <Utensils
                        size={24}
                        color={'#1F2937'}
                      />
                    </View>
                  )}
                  <View className="flex flex-col flex-1">
                    <Text className="text-lg font-display-medium text-gray-900">
                      {item.name.split(',')[0]}
                    </Text>
                    {item.notes ? (
                      <Text
                        className="text-sm font-display text-gray-600"
                        numberOfLines={1}
                      >
                        {item.notes}
                      </Text>
                    ) : (
                      <Text className="text-sm font-display text-gray-600">
                        {Number(item.calories).toFixed(1)} kcal
                      </Text>
                    )}
                  </View>
                </View>
                <Pressable
                  className="p-2 ml-2"
                  onPress={async () => {
                    const res = await client
                      .post<
                        | { error: false; data: PostTrackFood }
                        | { error: true; message: string }
                      >('foods/track', {
                        json: {
                          mealName: meal?.toLowerCase(),
                          programId: Number(programId),
                          dayIndex: Number(selectedDay),
                          foodId: item.id
                        }
                      })
                      .json()
                    if (res.error) {
                      Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: res.message
                      })
                      return
                    }
                    Toast.show({
                      type: 'success',
                      text1: 'Food Added'
                    })
                    router.navigate('/nutrical/meals')
                  }}
                >
                  <CirclePlus
                    size={24}
                    color={'#10B981'}
                  />
                </Pressable>
              </View>
            )}
            ListFooterComponent={
              <View className="py-4 items-center">
                {isValidating && <ActivityIndicator />}
                {!isValidating && foods.length === 0 && (
                  <Text className="text-gray-500">No meals found.</Text>
                )}
                {!isValidating &&
                  foods.length > 0 &&
                  (isEnd ? (
                    <Text className="text-gray-400 mt-2">End of results</Text>
                  ) : (
                    <Pressable
                      className="bg-blue-500 px-4 py-2 rounded mt-2"
                      onPress={() => setPage((p) => p + 1)}
                      disabled={isValidating}
                    >
                      <Text className="text-white font-bold">Load More</Text>
                    </Pressable>
                  ))}
              </View>
            }
          />
        </View>
      </ScrollView>
    </View>
  )
}
