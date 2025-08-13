import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Text, View } from 'react-native'

import Border from '../account/Border'
import { ChevronLeft } from 'lucide-react-native'
//TODO: Add Detailed View
export default function MainMealSelection({ title, subtitle, icon, href }) {
  return (
    <View className={'flex flex-col bg-white rounded-lg py-2 px-4 mt-2 mx-2'}>
      <View className={'flex flex-row items-center'}>
        <MaterialIcons
          name={icon}
          size={36}
          color={'#16a34a'}
        />
        <View className={'flex-grow ml-2 items-start'}>
          <Text className={'font-display-medium text-lg'}>{title}</Text>
          <Text className={'font-display text-gray-600'}>{subtitle}</Text>
        </View>
        <View className={' rounded-full bg-teal-300'}>
          <ChevronLeft />
        </View>
      </View>
      <Border />
      <View className={'flex flex-row justify-between items-center mx-4'}>
        <View className={'flex flex-col items-start'}>
          <Text className={'text-base font-display-medium'}></Text>
          <Text className={'text-xs text-gray-600 font-display'}>
            
          </Text>
        </View>
        <View>
          <Text className={'text-sm font-display'}></Text>
        </View>
      </View>
    </View>
  )
}
