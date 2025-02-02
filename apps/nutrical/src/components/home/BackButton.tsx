import { ChevronLeft } from 'lucide-react-native'
import { Pressable } from 'react-native'

export default function BackButton(props: {
  canGoBack: boolean
  tintColor: string
  onPress: () => void
}) {
  return (
    <Pressable
      className={props.canGoBack ? 'pr-5 py-1' : 'hidden'}
      onPress={props.onPress}
    >
      <ChevronLeft
        color={props.tintColor}
        size={24}
      />
    </Pressable>
  )
}
