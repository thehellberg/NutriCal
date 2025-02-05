import { Circle, CircleCheck } from 'lucide-react-native'
import { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Switch,
  ScrollView,
  SafeAreaView
} from 'react-native'

export default function FoodPreferences() {
  const [foodPreferences, setFoodPreferences] = useState<
    'None' | 'Vegetarian' | 'Vegan' | 'Pescetarian'
  >('None')
  const [allergies, setAllergies] = useState<
    (
      | 'Gluten Intolerant'
      | 'Wheat Intolerant'
      | 'Lactose Intolerant'
      | 'Allergic to Milk'
      | 'Allergic to Egg'
      | 'Allergic to Shellfish'
      | 'Allergic to Fish'
      | 'Allergic to Nuts'
    )[]
  >([])
  function handleAllergy(
    allergy: (typeof allergies)[number] | 'None',
    remove: boolean
  ) {
    if (allergy === 'None') {
      setAllergies([])
    } else if (remove) {
      setAllergies(allergies.filter((a) => a !== allergy))
    } else {
      setAllergies([...allergies, allergy])
    }
  }
  function handleSave() {
    // Save the food preferences and allergies to the server
    const tagIds = [
      { id: 1000, name: 'Vegetarian' },
      { id: 1001, name: 'Vegan' },
      { id: 1002, name: 'Pescetarian' },
      { id: 1003, name: 'Gluten Intolerant' },
      { id: 1004, name: 'Wheat Intolerant' },
      { id: 1005, name: 'Lactose Intolerant' },
      { id: 1006, name: 'Allergic to Milk' },
      { id: 1007, name: 'Allergic to Egg' },
      { id: 1008, name: 'Allergic to Shellfish' },
      { id: 1009, name: 'Allergic to Fish' },
      { id: 1010, name: 'Allergic to Nuts' }
    ]
    const selectedTagIds = [
      ...allergies.map(
        (allergy) => tagIds.find((tag) => tag.name === allergy)?.id
      ),
      ...(foodPreferences !== 'None'
        ? [tagIds.find((tag) => tag.name === foodPreferences)?.id]
        : [])
    ].filter((id): id is number => id !== undefined)
    console.log(selectedTagIds)
  }
  return (
    <SafeAreaView className="flex flex-col">
      <ScrollView className="flex flex-col flex-shrink basis-11/12 py-4">
        <Text
          className={'font-display-medium text-xl text-gray-600 px-4 mt-4 mb-1'}
        >
          Food Preferences
        </Text>
        <View
          className={
            'mx-4 bg-white flex flex-col rounded-lg overflow-hidden gap-1'
          }
        >
          {(['None', 'Vegetarian', 'Vegan', 'Pescetarian'] as const).map(
            (preference) => (
              <Pressable
                key={preference}
                onPress={() => {
                  setFoodPreferences(preference)
                }}
              >
                <View
                  className={
                    'flex flex-row justify-between items-center px-6 py-4 rounded-lg'
                  }
                >
                  <Text className={'font-display-medium text-lg'}>
                    {preference}
                  </Text>
                  {foodPreferences === preference ? (
                    <CircleCheck />
                  ) : (
                    <Circle />
                  )}
                </View>
                {preference !== 'Pescetarian' && <Border />}
              </Pressable>
            )
          )}
        </View>
        <Text
          className={'font-display-medium text-xl text-gray-600 px-4 mt-4 mb-1'}
        >
          Allergies
        </Text>
        <View
          className={
            'mx-4 bg-white flex flex-col rounded-lg overflow-hidden gap-1'
          }
        >
          {(
            [
              'None',
              'Gluten Intolerant',
              'Wheat Intolerant',
              'Lactose Intolerant',
              'Allergic to Milk',
              'Allergic to Egg',
              'Allergic to Shellfish',
              'Allergic to Fish',
              'Allergic to Nuts'
            ] as const
          ).map((allergy) => (
            <View key={allergy}>
              <View
                className={
                  'flex flex-row justify-between items-center px-6 py-4 rounded-lg'
                }
              >
                <Text className={'font-display-medium text-lg'}>{allergy}</Text>
                <Switch
                  onValueChange={(value) => {
                    handleAllergy(allergy, !value)
                  }}
                  value={
                    allergy === 'None'
                      ? allergies.length === 0
                      : allergies.includes(allergy)
                  }
                />
              </View>
              {allergy !== 'Allergic to Nuts' && <Border />}
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="flex-grow basis-1/12 w-screen">
        <Pressable
          className={
            'bg-primary rounded-lg p-4 mt-2 mx-4 flex flex-row items-center justify-center bg-green-600'
          }
          onPress={() => {
            handleSave()
          }}
        >
          <Text className={'font-display-medium text-lg text-white'}>
            Save Preferences
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
const Border = () => (
  <View className="h-0.5 w-full rounded-full ml-4 bg-gray-100" />
)
