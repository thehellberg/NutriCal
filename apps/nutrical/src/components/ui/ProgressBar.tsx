import { View } from 'react-native'
export default function ProgressBar(props: {
  value: number
  limit: number
  color: string
}) {
  const percent = (props.value / props.limit) * 100
  return (
    <View className={'relative h-2 my-1 w-full'}>
      <View
        className={'absolute bg-slate-300 w-full rounded-full h-2 px-2 '}
      ></View>
      <View
        style={{ width: `${percent}%`, backgroundColor: props.color }}
        className={'absolute rounded-full h-2 z-10'}
      ></View>
    </View>
  )
}
