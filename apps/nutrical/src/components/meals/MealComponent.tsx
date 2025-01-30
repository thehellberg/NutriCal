import { Link } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

import Border from '../account/Border'

import type { UserPrograms } from '@backend/types'
export default function MealComponent(props: {
  recipe: UserPrograms[number]['programRecipes'][number]['recipe']
}) {
  return (
    <Link
      href={`/nutrical/meals/recipe/${props.recipe?.id}`}
      asChild
    >
      <Pressable>
        <Border />
        <View
          className={'flex flex-row justify-between items-center mx-4 my-0.5'}
        >
          <View className={'flex flex-col text-right flex-shrink mr-2'}>
            <Text className={'text-base font-display-medium text-left'}>
              {props.recipe?.name}
            </Text>
            {props.recipe?.notes && (
              <Text
                className={'text-xs text-gray-600 font-display text-left w-44'}
              >
                {props.recipe.notes}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </Link>
  )
}
