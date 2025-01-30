import { Text, View } from 'react-native'
export default function MainMealStat(props: {
  type: string
  value: number
  limit: number
  color: string
}) {
  const percent = (props.value / props.limit) * 100
  return (
    <View
      className={'flex flex-col justify-center items-center w-18 basis-1/3'}
    >
      <Text className={'font-display-bold text-' + props.color}>
        {props.type}
      </Text>
      <View className={'relative w-16 h-2 my-1'}>
        <View
          className={'absolute bg-slate-300 w-16 rounded-full h-2 px-2 '}
        ></View>
        <View
          style={{ width: percent + '%' }}
          className={'absolute rounded-full h-2 z-10 bg-' + props.color}
        ></View>
      </View>
      <Text
        className={'text-xs text-gray-600'}
      >{`${props.value} / ${props.limit}g`}</Text>
    </View>
  )
}
