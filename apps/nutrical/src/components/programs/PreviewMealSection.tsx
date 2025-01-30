import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlashList } from '@shopify/flash-list'
import React, { useMemo } from 'react'
import { View, Text } from 'react-native'

import PreviewMealComponent from './PreviewMealComponent'

import type { ProgramTemplate } from '@backend/types'

export default function PreviewMealSection(props: {
  program: ProgramTemplate
  selectedDay: number
  title: string
}) {
  const mealData = useMemo(() => {
    const mealName =
      props.title === 'Breakfast'
        ? 'breakfast'
        : props.title === 'Dinner'
          ? 'dinner'
          : props.title === 'Lunch'
            ? 'lunch'
            : props.title === 'Snack'
              ? 'snack'
              : 'functional_food'
    const mealDefault: {
      meals: NonNullable<ProgramTemplate>['programTemplateRecipes']
      sums: { cal: number; carb: number; protein: number; fat: number }
    } = {
      meals: [],
      sums: { cal: 0, carb: 0, protein: 0, fat: 0 }
    }
    if (!props.program) return mealDefault
    const tempMeal = mealDefault

    props.program?.programTemplateRecipes.forEach((element) => {
      if (
        element.mealName === mealName &&
        element.dayIndex === props.selectedDay
      ) {
        tempMeal.meals.push(element)
      }
    })
    return tempMeal
  }, [props.program, props.title, props.selectedDay])
  if (!props.program) {
    return <View></View>
  }
  return (
    <View>
      <View className={'flex flex-col bg-white p-4'}>
        <View className={'flex flex-row items-center justify-between'}>
          <View className={'flex flex-row items-center'}>
            <MaterialIcons
              name={
                props.title === 'Breakfast'
                  ? 'breakfast-dining'
                  : props.title === 'Dinner'
                    ? 'dinner-dining'
                    : props.title === 'Lunch'
                      ? 'free-breakfast'
                      : props.title === 'Snack'
                        ? 'bakery-dining'
                        : 'bakery-dining'
              }
              size={36}
              color={'#16a34a'}
            />
            <View className={'flex-col flex ml-2 items-start justify-center'}>
              <Text className={'font-display-medium text-lg'}>
                {props.title}
              </Text>
            </View>
          </View>
        </View>
        <FlashList
          estimatedItemSize={69}
          data={mealData.meals}
          renderItem={({ item }) => (
            <PreviewMealComponent recipe={item.recipe} />
          )}
        />
      </View>
    </View>
  )
}
