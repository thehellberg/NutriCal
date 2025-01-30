import { useState, useEffect } from 'react'
import { View } from 'react-native'
import Svg, { Path, Text as SvgText } from 'react-native-svg'

export default function ProgressCircle(props: {
  radius: number
  strokeWidth: number
  progress: number // Should be a value between 0 and 1
  color: string
  maxValue: number
}) {
  const [circumference, setCircumference] = useState(0)

  useEffect(() => {
    const circumferenceValue = 2 * Math.PI * props.radius * 0.72
    setCircumference(circumferenceValue)
  }, [props.radius])

  const strokeDashoffset = circumference * (1 - props.progress)
  const progressValue = Math.round(props.progress * props.maxValue) // Assuming progress is between 0 and 1 and total is 2000

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
      style={{
        aspectRatio: 2,
        width: props.radius * 2,
        height: props.radius * 3
      }}
      className="flex justify-center items-center bg-black"
    >
      <Svg
        width={props.radius * 2}
        height={props.radius * 1.25}
      >
        {/* <Circle
          cx={props.radius}
          cy={props.radius}
          r={props.radius * 0.72}
          fill="none"
          stroke="#ccc"
          strokeWidth={props.strokeWidth}
          strokeDasharray={`${circumference / 2} ${circumference / 2}`}
          strokeDashoffset={0}
          transform={`rotate(270 ${props.radius} ${props.radius})`}
        />
        <Circle
          cx={props.radius}
          cy={props.radius}
          r={props.radius * 0.72}
          fill="none"
          stroke={props.color}
          strokeWidth={props.strokeWidth}
          strokeDasharray={`${circumference / 2} ${circumference / 2}`}
          strokeDashoffset={(1 - props.progress) * (circumference / 2)}
          strokeLinecap="round"
          transform={`rotate(270 ${props.radius} ${props.radius})`}
        /> */}
        <Path
          d={`
            M ${props.radius - props.radius * 0.72},${props.radius}
            A ${props.radius * 0.72} ${props.radius * 0.72} 0 0 1 ${props.radius + props.radius * 0.72},${props.radius}
          `}
          fill="none"
          stroke="#ccc"
          strokeWidth={props.strokeWidth}
          strokeLinecap="round"
        />
        <Path
          d={number()}
          fill="none"
          stroke={props.color}
          strokeWidth={props.strokeWidth}
          strokeLinecap="round"
        />
        <SvgText
          x="50%"
          y="70%"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={props.radius / 2.5}
          fill={props.color}
          fontWeight="bold"
        >
          {progressValue}
        </SvgText>
      </Svg>
    </View>
  )
}
