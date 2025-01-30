import { Text, View } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

export default function WaterCircle(props: {
  radius: number
  strokeWidth: number

  data: number[]
}) {
  return (
    <View className={'relative flex flex-col items-center justify-center m-2'}>
      <Text
        className={
          'z-10 text-black font-display text-lg w-24 absolute text-center'
        }
      >
        <Text className={'text-2xl font-display-medium'}>0</Text>
        {'\n'}/8 cups
      </Text>
      <ProgressChart
        data={props.data}
        width={props.radius * 2 + props.strokeWidth}
        height={props.radius * 2 + props.strokeWidth}
        strokeWidth={props.strokeWidth}
        radius={props.radius}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`
        }}
        hideLegend={true}
      />
    </View>
  )
}
