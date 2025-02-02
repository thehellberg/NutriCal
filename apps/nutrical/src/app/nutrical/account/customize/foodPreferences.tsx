import { View } from 'react-native'

import PersonalDetailsRow from '~/components/account/customize/PersonalDetailsRow'

export default function FoodPreferences() {
  return (
    <View className="bg-white flex flex-col">
      <PersonalDetailsRow
        title="Current Weight"
        value={weight || '0'}
        onChangeText={setWeight}
      />
    </View>
  )
}
