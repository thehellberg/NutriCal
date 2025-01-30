import { ProgramTemplates } from '@backend/types'
import { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'

import FeaturedPrograms from '~/components/programs/FeaturedPrograms'
import ProgramCatalog from '~/components/programs/ProgramCatalog'

export default function Programs() {
  const { data: programData } = useSWR<
    { error: false; data: ProgramTemplates } | { error: true; message: string }
  >('programs/templates')
  useEffect(() => {
    if (programData?.error) {
      Toast.show({ type: 'error', text1: 'Error' })
    }
  }, [programData?.error])
  const programs = programData?.error ? undefined : programData?.data

  return (
    <SafeAreaView>
      <ScrollView className="h-screen">
        <View>
          <Text
            className={'text-4xl font-display-medium self-start mx-4 mb-2 mt-8'}
          >
            Programs
          </Text>
        </View>
        {programs && programs.length > 0 && (
          <View>
            <FeaturedPrograms programs={programs?.slice(0, 3)} />
            <ProgramCatalog programs={programs} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
