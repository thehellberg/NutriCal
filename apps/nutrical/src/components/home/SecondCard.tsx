import { Text, View } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'
export default function SecondCard({ type, value, limit, color, rgb }) {
  const data = {
    data: [, , value / limit]
  }
  return (
    <View
      className={'flex flex-col items-center justify-center gap-2 mt-2 mx-1'}
    >
      <Text className={'font-display-bold text-' + color}>{type}</Text>
      <View className={'relative flex flex-col items-center justify-center'}>
        <View className={'z-10 w-24 absolute'}>
          <Text className={'text-center text-base leading-tight font-bold'}>
            {value}
          </Text>
          <Text
            className={'text-gray-600 text-xs text-center leading-3'}
          >{`/${limit}g`}</Text>
        </View>
        <ProgressChart
          data={data}
          width={80}
          height={80}
          strokeWidth={6}
          radius={30}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(${rgb}, ${opacity})`
          }}
          hideLegend={true}
          className={''}
        />
      </View>
      <Text className={'text-gray-600 font-display-medium'}></Text>
    </View>
  )
}
