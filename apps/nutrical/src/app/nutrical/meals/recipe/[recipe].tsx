import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'

import type { GetFoodById } from '@backend/types'

import Border from '~/components/account/Border'
import NutritionalInformationRow from '~/components/meals/recipe/NutritionalInformationRow'
import NutritionalInformationSubRow from '~/components/meals/recipe/NutritionalInformationSubRow'

export default function RecipePage() {
  const { recipe } = useLocalSearchParams()
  const { data: recipeData, isLoading } = useSWR<
    { error: false; data: GetFoodById } | { error: true; message: string }
  >(`foods/${recipe}`)

  useEffect(() => {
    if (recipeData?.error) {
      Toast.show({ type: 'error', text1: 'Error', text2: recipeData.message })
    }
  }, [recipeData])
  const recipeDetails = recipeData?.error ? undefined : recipeData?.data

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator
          size="large"
          color="#16A34A"
        />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-6 pt-8">
          <Text className={'text-3xl font-display-bold text-gray-900 mb-4'}>
            {recipeDetails?.name}
          </Text>
        </View>

        <View className="px-6 mb-6">
          <View className="flex-row items-center">
            <View className="bg-white rounded-lg h-12 w-16 justify-center items-center border border-gray-300">
              <TextInput
                inputMode="numeric"
                value={'1'}
                className="font-display-medium text-center text-lg text-gray-900"
              />
            </View>
            <View className="flex-1 justify-center bg-white rounded-lg h-12 px-4 ml-3 border border-gray-300">
              <Text className="text-lg font-display-medium text-gray-700">
                {recipeDetails?.servings} Servings
              </Text>
            </View>
          </View>
        </View>

        {recipeDetails?.recipeIngredients &&
          recipeDetails?.recipeIngredients.length > 0 && (
            <View className="px-6 mb-6">
              <Text
                className={'text-xl font-display-semibold text-gray-800 mb-3'}
              >
                Ingredients
              </Text>
              <View className="bg-white p-4 rounded-lg border border-gray-200">
                {recipeDetails.recipeIngredients.map((ingredient, index) => (
                  <View
                    key={index}
                    className="flex-row items-start py-2"
                  >
                    <Text className="text-base font-display text-gray-700">
                      {ingredient.ingredientText}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

        {recipeDetails?.recipeSteps &&
          recipeDetails?.recipeSteps.length > 0 && (
            <View className="px-6 mb-6">
              <Text
                className={'text-xl font-display-semibold text-gray-800 mb-3'}
              >
                Steps
              </Text>
              <View className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                {recipeDetails.recipeSteps.map((step, index) => (
                  <View
                    key={index}
                    className="flex-row items-start py-2"
                  >
                    <Text className="text-base font-display text-gray-700 leading-6">
                      <Text className="font-display-semibold">
                        {index + 1}.{' '}
                      </Text>
                      {step.stepText}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

        <View className="px-6">
          <Text className={'text-xl font-display-semibold text-gray-800 mb-3'}>
            Nutritional Information
          </Text>
          <View className="bg-white p-4 rounded-lg border border-gray-200">
            <Text className="text-xl font-display-medium text-gray-900">
              {recipeDetails?.name}
            </Text>
            <Text className="text-base font-display text-gray-600 mb-3">
              Per {recipeDetails?.servings} Servings
            </Text>
            <Border />
            <NutritionalInformationRow
              label={'Calories'}
              value={`${parseFloat(recipeDetails?.calories || '0').toFixed(1)} kcal`}
            />
            <Border />
            <NutritionalInformationRow
              label={'Carbohydrates'}
              value={`${parseFloat(recipeDetails?.carbohydrates || '0').toFixed(1)} g`}
            />
            {recipeDetails?.fiber != null && (
              <NutritionalInformationSubRow
                label={'Fibers'}
                value={`${parseFloat(recipeDetails?.fiber || '0').toFixed(1)} g`}
              />
            )}
            {recipeDetails?.simpleSugars != null && (
              <NutritionalInformationSubRow
                label={'Simple Sugars'}
                value={`${parseFloat(recipeDetails?.simpleSugars || '0').toFixed(1)} g`}
              />
            )}
            <Border />
            <NutritionalInformationRow
              label={'Proteins'}
              value={`${parseFloat(recipeDetails?.proteins || '0').toFixed(1)} g`}
            />
            <Border />
            <NutritionalInformationRow
              label={'Fats'}
              value={`${parseFloat(recipeDetails?.fats || '0').toFixed(1)} g`}
            />
            {recipeDetails?.saturatedFats != null && (
              <NutritionalInformationSubRow
                label={'Saturated Fats'}
                value={`${parseFloat(recipeDetails?.saturatedFats || '0').toFixed(1)} g`}
              />
            )}
            {recipeDetails?.unsaturatedFats != null && (
              <NutritionalInformationSubRow
                label={'Unsaturated Fats'}
                value={`${parseFloat(recipeDetails?.unsaturatedFats || '0').toFixed(1)} g`}
              />
            )}
            <Border />
            <NutritionalInformationRow
              label={'Other'}
              value={''}
            />
            {recipeDetails?.cholesterol != null && (
              <NutritionalInformationSubRow
                label={'Cholesterol'}
                value={`${parseFloat(recipeDetails?.cholesterol || '0').toFixed(1)} mg`}
              />
            )}
            {recipeDetails?.sodium != null && (
              <NutritionalInformationSubRow
                label={'Sodium'}
                value={`${parseFloat(recipeDetails?.sodium || '0').toFixed(1)} mg`}
              />
            )}
            {recipeDetails?.potassium != null && (
              <NutritionalInformationSubRow
                label={'Potassium'}
                value={`${parseFloat(recipeDetails?.potassium || '0').toFixed(1)} mg`}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
