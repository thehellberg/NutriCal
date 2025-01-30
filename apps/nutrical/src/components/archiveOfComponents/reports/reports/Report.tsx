import { Text, View } from 'react-native'
import WeightGraph from './WeightGraph'
import BodyPieChart from './BodyPieChart'
import InfoWithRange from './InfoWithRange'
import dayjs from 'dayjs'

export default function Report({ reportData, bodyDistributionData, BMI, BMR }) {
  let weightDataLabels = []
  let weightDataValues = []
  reportData.forEach((value) => {
    weightDataLabels.push(dayjs(value['RecordDay']).format('DD/MM'))
    weightDataValues.push(Math.round(value['Weight'] * 10) / 10)
  })
  let weightData = {
    labels: weightDataLabels,
    datasets: [
      {
        data: weightDataValues,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ]
  }
  return (
    <View className={'pb-12'}>
      {reportData.length > 1 && (
        <>
          <Text
            className={
              'font-display-medium text-lg text-gray-700 self-start mx-4 mt-4 mb-1'
            }
          >
            Weight
          </Text>
          <WeightGraph weightData={weightData} />
        </>
      )}
      <Text
        className={
          'font-display-medium text-lg text-gray-700 self-start mx-4 mt-4 mb-1'
        }
      >
        Body Composition Analysis
      </Text>
      <BodyPieChart bodyDistributionData={bodyDistributionData} />
      <Text
        className={
          'font-display-medium text-lg text-gray-700 self-start mx-4 mt-4 mb-1'
        }
      >
        Information
              </Text>
      <InfoWithRange
        value={BMI}
        NormOverDiv={25}
        underNormDiv={18}
        label={'Body Mass Index(BMI)'}
        minimum={10}
        maximum={60}
      />
      <InfoWithRange
        value={BMR}
        NormOverDiv={2000}
        underNormDiv={1000}
        label={'Basal Metabolic Rate(BMR)'}
        minimum={0}
        maximum={3000}
      />
    </View>
  )
}
/*            <BodyPieChart/>
            <InfoWithRange/>*/
