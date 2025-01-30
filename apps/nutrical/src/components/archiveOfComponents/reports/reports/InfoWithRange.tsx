import { Dimensions, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
const screenWidth = Dimensions.get('window').width

export default function InfoWithRange({
  label,
  value,
  minimum,
  underNormDiv,
  NormOverDiv,
  maximum
}) {
  let [BMIText, setBMIText] = useState(['', '#ef4444'])
  let [pointerMargin, setPointerMargin] = useState(50)

  useEffect(() => {
    //BMI bar logic
    let maxBMIRel = screenWidth - 10 //must not exceed
    let minBMIRel = 10 //must not drop below
    let valueRel
    let pointerMargin = (maxBMIRel * 2 + 40) / 3
    //TODO: Add more accurate BMI range (for different sexes)
    if (value >= NormOverDiv) {
      //lower bound 210 / upper bound 270
      valueRel =
        ((value - NormOverDiv) * (270 - 210)) / (maximum - NormOverDiv) + 210
      setPointerMargin(valueRel)
    } else if (value <= underNormDiv) {
      // lower bound 10 / upper bound 75
      valueRel = ((value - minimum) * (75 - 10)) / (underNormDiv - minimum) + 10
      setPointerMargin(valueRel)
    } else {
      //lower bound 100 / upper bound 180
      valueRel =
        ((value - underNormDiv) * (180 - 100)) / (NormOverDiv - underNormDiv) +
        100
      setPointerMargin(valueRel)
    }
    //////
  }, [value])
  return (
    <View>
      <View
        className={
          'bg-white mx-4 px-4 py-6 rounded-lg shadow pt-4 flex flex-col justify-center items-start mb-4 '
        }
      >
        <Text className={'font-display-bold'}>{label}</Text>
        <View className={'flex flex-row justify-between items-center w-full'}>
          <Text className={'text-lg font-bold'}>{value}</Text>
          <View
            className={'rounded-lg px-2 py-1'}
            style={{ backgroundColor: BMIText[1] }}
          >
            <Text className={'text-white text-xs font-display-bold'}>
              {BMIText[0]}
            </Text>
          </View>
        </View>
        <View className={' h-2 my-1  self-center'}>
          <View className={'h-2 flex flex-row '}>
            <View
              className={'basis-1/3 rounded-l-lg bg-[#63a4cc]'}
              id={'under'}
            ></View>
            <View
              className={'basis-1/3 bg-[#069b69]'}
              id={'normal'}
            ></View>
            <View
              className={'basis-1/3 rounded-r-lg bg-[#f99d52]'}
              id={'over'}
            ></View>
          </View>
          <View
            style={{ marginLeft: pointerMargin }}
            className={'absolute flex flex-col justify-start items-center'}
          >
            <View
              className={
                'h-4 w-4 -mt-1 bg-transparent border-4 border-white rounded-full z-10'
              }
            ></View>
            <Text
              style={{ color: BMIText[1] }}
              className={'font-bold'}
            >
              {value}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
