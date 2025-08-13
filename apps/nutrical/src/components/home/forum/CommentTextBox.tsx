import { ArrowUp } from 'lucide-react-native'
import { Pressable, TextInput, View } from 'react-native'
export default function CommentTextBox(props: {
  messageText: string
  setMessageText: (text: string) => void
  sendDisabled: boolean
  sendTextMessage: () => void
}) {
  return (
    <View
      className={
        'flex flex-row-reverse items-center justify-end px-3 py-1.5 w-screen flex-initial flex-grow-0'
      }
    >
      <TextInput
        value={props.messageText}
        className={
          'bg-white rounded-3xl max-h-48  px-3 mx-1.5 self-start border border-gray-300 font-Tajawal pb-1 flex-grow flex-shrink'
        }
        multiline
        textAlign={'right'}
        placeholder={'رسالة نصية'}
        maxLength={300}
        onChangeText={(text) => {
          props.setMessageText(text)
        }}
      />
      <Pressable
        style={{ backgroundColor: '#0A84FF' }}
        disabled={props.sendDisabled}
        onPress={() => {
          props.sendTextMessage()
        }}
        className={'rounded-full p-1 m-1'}
      >
        <ArrowUp color={'#fff'} />
      </Pressable>
    </View>
  )
}
