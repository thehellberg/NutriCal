import { ProgramTemplates } from '@backend/types'
import { FlashList } from '@shopify/flash-list'
import { View, Text } from 'react-native'

import CatalogCard from './CatalogCard'

export default function ProgramCatalog(props: { programs: ProgramTemplates }) {
  return (
    <View className={'flex flex-col items-start w-screen pt-2'}>
      <Text className={'font-display-medium text-xl text-gray-600 px-4 mt-2'}>
        Recently Added
      </Text>
      <View className={'flex-1 w-full'}>
        <FlashList
          data={props.programs}
          renderItem={({ item }) => <CatalogCard program={item} />}
          horizontal
          className={'w-screen px-4 mt-2'}
          pagingEnabled
          estimatedItemSize={300}
        />
      </View>
    </View>
  )
}
