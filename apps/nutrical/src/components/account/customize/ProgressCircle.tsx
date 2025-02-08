import { useState, useEffect } from 'react'
import { View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

export default function ProgressCircle(props: {
  radius: number
  strokeWidth: number
  progress: number // Should be a value between 0 and 1
  color: string
  maxValue: number
  zIndex?: number
}) {
  const [circumference, setCircumference] = useState(0)

  useEffect(() => {
    const circumferenceValue = 2 * Math.PI * props.radius * 0.86 //Magic numbers, but it works: to make percents right
    setCircumference(circumferenceValue)
  }, [props.radius])

  const strokeDashoffset = circumference * (1 - props.progress)
  const progressValue = Math.round(props.progress * props.maxValue) // Assuming progress is between 0 and 1 and total is 2000

  // useEffect(() => {
  //   const circumferenceValue = 2 * Math.PI * props.radius * 0.72
  //   setCircumference(circumferenceValue)
  // }, [props.radius])

  // const strokeDashoffset = circumference * (1 - props.progress)
  // const progressValue = Math.round(props.progress * props.maxValue) // Assuming progress is between 0 and 1 and total is 2000

  function number() {
    const r = props.radius * 0.72
    const angle = Math.PI * props.progress
    const x = props.radius - r * Math.cos(angle)
    const y = props.radius - r * Math.sin(angle)
    return `
                M ${props.radius - r},${props.radius}
                A ${r} ${r} 0 0 1 ${x},${y}
              `
  }
  return (
    <View
      style={{ aspectRatio: 1, width: props.radius * 2, zIndex: props.zIndex }}
      className="absolute"
    >
      <Svg
        width={props.radius * 2}
        height={props.radius * 2}
        style={{ transform: [{ rotate: '-90deg' }] }}
      >
        <Circle
          stroke={props.color}
          fill="transparent"
          strokeWidth={props.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          cx={props.radius}
          cy={props.radius}
          r={props.radius - props.strokeWidth / 2}
        />
      </Svg>
    </View>
  )
}
