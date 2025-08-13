import { FlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'
import { Link, useLocalSearchParams } from 'expo-router'
import { CirclePlus, ScanBarcode, Utensils } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator
} from 'react-native'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'

import type { GetFoods } from '@backend/types'

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

  return (
    <View className="flex-1 bg-gray-50">
      <FlashList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <View className="flex flex-col w-full py-4">
              <View className="flex flex-row items-center">
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
                  href={{
                    pathname: '/nutrical/meals/recipe/add/barcode',
                    params: { meal, selectedDay, programId }
                  }}
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
          </View>
        }
        estimatedItemSize={88}
        data={foods}
        scrollEventThrottle={30}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if (!isEnd && !isValidating) {
            setPage((p) => p + 1)
            console.log('Loading more foods, current page:', page)
          }
        }}
        renderItem={({ item }) => (
          <Link
            asChild
            href={{
              pathname: `/nutrical/meals/recipe/add/foodDetails`,
              params: { foodId: item.id, meal, selectedDay, programId }
            }}
          >
            <Pressable className="flex flex-row p-4 items-center justify-between bg-white rounded-lg mb-4 border border-gray-200">
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
              <View className="p-2 ml-2">
                <CirclePlus
                  size={24}
                  color={'#10B981'}
                />
              </View>
            </Pressable>
          </Link>
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
  )
}
