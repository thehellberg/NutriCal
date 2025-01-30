import { Image, View } from 'react-native'
export default function Header() {
  return (
    <View className={'flex flex-row justify-center items-center mb-2 '}>
      <Image
        source={require('@assets/logo.png')}
        className={'w-64 h-6'}
        height={24}
        resizeMode="contain"
      />
    </View>
  )
}
