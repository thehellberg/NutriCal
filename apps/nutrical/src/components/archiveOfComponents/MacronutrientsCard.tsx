import { View, Text } from 'react-native'

import SecondCard from '../home/SecondCard'

export default function MacronutrientsCard(props: {
  data: {
    protein: number
    carbs: number
    fats: number
  }
}) {
  return (
    <View
      className={
        'bg-white flex flex-col justify-center items-start w-screen  px-6 py-2'
      }
    >
      <Text className={'text-lg font-display-medium'}>Macronutrients</Text>
      <View className={'flex flex-row'}>
        <SecondCard
          type={'Carbohydrates'}
          value={100}
          limit={165}
          color={'emerald-700'}
          rgb={'5,150,105'}
        />
        <SecondCard
          type={'Fats'}
          value={35}
          limit={65}
          color={'blue-800'}
          rgb={'7,89,133'}
        />
        <SecondCard
          type={'Proteins'}
          value={65}
          limit={85}
          color={'yellow-500'}
          rgb={'250,204,21'}
        />
      </View>
    </View>
  )
}
