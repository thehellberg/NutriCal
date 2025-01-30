import { Text, View } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

export default function ProgressCircle(props: {
  radius: number
  strokeWidth: number

  data: number[]
}) {
  return (
    <View className={'relative flex flex-col items-center justify-center'}>
      <Text
        className={
          'z-10 text-black font-display text-lg w-24 absolute text-center'
        }
      >
        <Text className={'text-4xl font-display-medium'}>1672</Text>
        {'\n'}Remaining
      </Text>
      <ProgressChart
        data={props.data}
        width={150}
        height={150}
        strokeWidth={props.strokeWidth}
        radius={props.radius}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(5,150,105, ${opacity})`
        }}
        hideLegend={true}
      />
    </View>
  )
}
