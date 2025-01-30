import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Image } from 'expo-image'
import { ScrollView, Text, View } from 'react-native'

import Header from '../Header'

export default function FlashListHeader() {
  return (
    <View className={''}>
      <Header />
      <ScrollView
        horizontal
        className={'flex flex-row '}
      ></ScrollView>
      <View className={'mt-2'}>
        <View
          className={
            'flex flex-row items-center bg-white p-2 border-b-4 border-gray-200'
          }
        >
          <Image
            source={require('@assets/icons8-male-user-96.png')}
            className={'h-10 rounded-full w-10'}
          />
          <View
            className={
              'bg-white rounded-3xl max-h-48 flex-grow px-3 mx-2 self-center border border-gray-300 font-display pb-1 flex-row items-start'
            }
          >
            <Text
              className={'rounded-full text-right text-gray-600 font-display'}
            >
              Write Here
            </Text>
          </View>
          <MaterialIcons
            name={'image'}
            size={32}
          />
        </View>
      </View>
    </View>
  )
}

{
  /*     <View className={"flex flex-row justify-evenly gap-2 mx-2"}>
                <Link href={"/meals"} asChild>
                  <Pressable className={"basis-1/2 flex flex-row bg-white rounded-lg justify-between mx-2 p-2 items-center"}>
                      <Text className={" text-lg font-display text-right"}></Text>
                      <MaterialIcons name='description' color="#15803d" size={32} />
                  </Pressable>
                </Link>
                <Link href={"/reports"} asChild>
                  <Pressable className={"basis-1/2 flex flex-row bg-white rounded-lg justify-between mx-2 p-2 items-center"}>
                      <Text className={" text-lg font-display text-right"}></Text>
                      <MaterialIcons name='contact-page' color="#15803d" size={32} />
                  </Pressable>
                </Link>
            </View>*/
}
