import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'

import type { Recipe } from '@backend/types'

import Border from '~/components/account/Border'
import NutritionalInformationRow from '~/components/meals/recipe/NutritionalInformationRow'
import NutritionalInformationSubRow from '~/components/meals/recipe/NutritionalInformationSubRow'

export default function RecipePage() {
  const { recipe } = useLocalSearchParams()
  const { data: recipeData } = useSWR<
    { error: false; data: Recipe } | { error: true; message: string }
  >(`recipes/${recipe}`)

  useEffect(() => {
    if (recipeData?.error) {
      Toast.show({ type: 'error', text1: 'Error', text2: recipeData.message })
    }
  }, [recipeData])
  const recipes = recipeData?.error ? undefined : recipeData?.data
  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <View>
          <Text
            className={'text-3xl font-display-medium self-start mx-4 mb-2 mt-8'}
          >
            {recipes?.name}
          </Text>
        </View>
        <View className="flex flex-row m-4">
          <View className="flex flex-row bg-white rounded-lg w-12 h-12 justify-center items-center align-middle">
            <TextInput
              inputMode="numeric"
              value={'1'}
              className=" font-display text-center text-lg"
            />
          </View>
          <View className="flex flex-row justify-start items-center bg-white rounded-lg flex-grow py-2 px-4 ml-2">
            <Text className="text-lg font-display text-left">
              {recipes?.servings} Servings
            </Text>
          </View>
        </View>
        {recipes?.recipeIngredients &&
          recipes?.recipeIngredients.length > 0 && (
            <View className="flex flex-col mt-2">
              <Text
                className={'text-xl font-display-medium self-start mx-4 mb-2'}
              >
                Ingredients
              </Text>
              <View className="bg-white mx-4 py-2 px-4 rounded-lg">
                {recipes.recipeIngredients.map((ingredient, index) => (
                  <View
                    key={index}
                    className="flex flex-row m-1"
                  >
                    <Text className="text-base font-display-medium text-left">
                      {ingredient.ingredientText}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        {recipes?.recipeSteps && recipes?.recipeSteps.length > 0 && (
          <View className="flex flex-col mt-2">
            <Text
              className={
                'text-xl font-display-medium self-start mx-4 mb-2 mt-4'
              }
            >
              Steps
            </Text>
            <View className="bg-white mx-4 rounded-lg py-2 px-4">
              {recipes.recipeSteps.map((step, index) => (
                <View
                  key={index}
                  className="flex flex-row m-1"
                >
                  <Text className="text-base font-display-medium text-left">
                    {step.stepText}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        <View className="flex flex-col mt-2">
          <Text
            className={'text-xl font-display-medium self-start mx-4 mb-2 mt-4'}
          >
            Nutritional Information
          </Text>
          <View className="flex flex-col mx-4 bg-white rounded-lg py-2 px-4">
            <Text className="text-xl font-display text-left">
              {recipes?.name}
            </Text>
            <Text className="text-base font-display-medium text-left">
              {recipes?.servings} Servings
            </Text>
            <Border />
            <NutritionalInformationRow
              label={'Calories'}
              value={
                recipes?.recipeComponentRecipes
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      (parseFloat(
                        currentValue.recipeComponent.calories || '0.001'
                      ) *
                        parseFloat(currentValue.weightInGrams || '0.001')) /
                        100
                    )
                  }, 0)
                  .toFixed(1) + ' kcal'
              }
            />
            <Border />
            <NutritionalInformationRow
              label={'Carbohydrates'}
              value={
                recipes?.recipeComponentRecipes
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      (parseFloat(
                        currentValue.recipeComponent.carbohydrates || '0.001'
                      ) *
                        parseFloat(currentValue.weightInGrams || '0.001')) /
                        100
                    )
                  }, 0)
                  .toFixed(1) + ' g'
              }
            />
            <NutritionalInformationSubRow
              label={'Fibers'}
              value={
                recipes?.recipeComponentRecipes
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      (parseFloat(
                        currentValue.recipeComponent.fiber || '0.001'
                      ) *
                        parseFloat(currentValue.weightInGrams || '0.001')) /
                        100
                    )
                  }, 0)
                  .toFixed(1) + ' g'
              }
            />
            <NutritionalInformationSubRow
              label={'Simple Sugars'}
              value={
                recipes?.recipeComponentRecipes
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      (parseFloat(
                        currentValue.recipeComponent.simpleSugars || '0.001'
                      ) *
                        parseFloat(currentValue.weightInGrams || '0.001')) /
                        100
                    )
                  }, 0)
                  .toFixed(1) + ' g'
              }
            />
            <Border />
            <NutritionalInformationRow
              label={'Proteins'}
              value={
                recipes?.recipeComponentRecipes
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      (parseFloat(
                        currentValue.recipeComponent.proteins || '0.001'
                      ) *
                        parseFloat(currentValue.weightInGrams || '0.001')) /
                        100
                    )
                  }, 0)
                  .toFixed(1) + ' g'
              }
            />
            <Border />
            <NutritionalInformationRow
              label={'Fats'}
              value={
                recipes?.recipeComponentRecipes
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      (parseFloat(
                        currentValue.recipeComponent.fats || '0.001'
                      ) *
                        parseFloat(currentValue.weightInGrams || '0.001')) /
                        100
                    )
                  }, 0)
                  .toFixed(1) + ' g'
              }
            />
            <NutritionalInformationSubRow
              label={'Saturated Fats'}
              value={
                recipes?.recipeComponentRecipes
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      (parseFloat(
                        currentValue.recipeComponent.saturatedFats || '0.001'
                      ) *
                        parseFloat(currentValue.weightInGrams || '0.001')) /
                        100
                    )
                  }, 0)
                  .toFixed(1) + ' g'
              }
            />
            <NutritionalInformationSubRow
              label={'Unsaturated Fats'}
              value={
                recipes?.recipeComponentRecipes
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      (parseFloat(
                        currentValue.recipeComponent.unsaturatedFats || '0.001'
                      ) *
                        parseFloat(currentValue.weightInGrams || '0.001')) /
                        100
                    )
                  }, 0)
                  .toFixed(1) + ' g'
              }
            />
            <Border />
            <NutritionalInformationRow
              label={'Other'}
              value={''}
            />
            <NutritionalInformationSubRow
              label={'Cholestrol'}
              value={
                recipes?.recipeComponentRecipes
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      (parseFloat(
                        currentValue.recipeComponent.cholesterol || '0.001'
                      ) *
                        parseFloat(currentValue.weightInGrams || '0.001')) /
                        100
                    )
                  }, 0)
                  .toFixed(1) + ' g'
              }
            />
            <NutritionalInformationSubRow
              label={'Sodium'}
              value={
                recipes?.recipeComponentRecipes
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      (parseFloat(
                        currentValue.recipeComponent.sodium || '0.001'
                      ) *
                        parseFloat(currentValue.weightInGrams || '0.001')) /
                        100
                    )
                  }, 0)
                  .toFixed(1) + ' g'
              }
            />
            <NutritionalInformationSubRow
              label={'Potassium'}
              value={
                recipes?.recipeComponentRecipes
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      (parseFloat(
                        currentValue.recipeComponent.potassium || '0.001'
                      ) *
                        parseFloat(currentValue.weightInGrams || '0.001')) /
                        100
                    )
                  }, 0)
                  .toFixed(1) + ' g'
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
