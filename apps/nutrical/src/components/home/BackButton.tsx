import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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
      <MaterialIcons
        name={'arrow-forward-ios'}
        size={24}
        color={props.tintColor}
      />
    </Pressable>
  )
}
