import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
global.Buffer = require('buffer').Buffer
dayjs.extend(customParseFormat)

export default function scale() {
  return (
    <SafeAreaView className={'h-screen pb-10'}>
      <ScrollView>
        <Text>
          There was a scale integration here, potential import screen for
          https://github.com/oliexdev/openScale
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}
