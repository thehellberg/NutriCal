import profileIcon from '@assets/icons-male-user-96.png'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import dayjs from 'dayjs'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Text, Dimensions, View, Pressable } from 'react-native'
import ImageModal from 'react-native-image-modal'
import Toast from 'react-native-toast-message'
import * as DropdownMenu from 'zeego/dropdown-menu'

const { width } = Dimensions.get('window')

export default function Post(props: {
  id: number
  content: string
  displayName: string
  favoriteUsers: Array<{ CustomerID: number }>
  image: string
  favoriteFunction: (isFavorited: boolean) => void
  repliesCount: number
  mediaType: boolean
  createdAt: string
  views: number
  selfAccountID: number
  alone: boolean
  hidePost: () => void
}) {
  const createdDate = dayjs(props.createdAt)
  const [isHidden, setHidden] = useState(false)
  const [isImageViewing, setIsImageViewing] = useState(false)
  const [isfavorited, toggleFavorite] = useState(
    props.favoriteUsers.some(
      (value) => props.selfAccountID == value['CustomerID']
    )
  )
  const [favoriteCount, setFavoriteCount] = useState(props.favoriteUsers.length)
  function favorite() {
    if (isfavorited) {
      return 'alreadyFavorite'
    }
    props.favoriteFunction(!isfavorited)
    toggleFavorite(true)
    setFavoriteCount(props.favoriteUsers.length + 1)
  }
  function postRemove() {
    setHidden(true)
  }
  //TODO: Add Support for multiple media
  //TODO: Add support for Viewing media
  return (
    <>
      {!isHidden && (
        <Link
          href={'/synbio/home/' + props.id}
          asChild
        >
          <Pressable
            className={' bg-white py-2 pl-2 pr-4 border-b-4 border-gray-100'}
          >
            <View className={'flex flex-row items-start py-1 w-full'}>
              <Image
                source={profileIcon}
                className={'h-12 rounded-full w-12'}
              />
              <View className={'text-right items-start ml-2'}>
                <Text className={' font-TajawalMedium'}>
                  {props.displayName}
                </Text>
                <Text className={'font-Tajawal text-xs text-gray-400'}>
                  {createdDate.fromNow()}
                </Text>
              </View>
              <View className={'self-end items-end ml-auto'}>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Pressable className={'p-2'}>
                      <MaterialIcons
                        name={'more-horiz'}
                        size={24}
                        color={'#94a3b8'}
                      />
                    </Pressable>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item
                      key={'0'}
                      onSelect={() => {
                        Toast.show({ type: 'success', text1: 'تم التبليغ' })
                      }}
                    >
                      <DropdownMenu.ItemTitle>
                        بلغ عن المنشور
                      </DropdownMenu.ItemTitle>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      key={'1'}
                      onSelect={() => {
                        postRemove()
                      }}
                    >
                      <DropdownMenu.ItemTitle>
                        إخفاء المنشور
                      </DropdownMenu.ItemTitle>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </View>
            </View>
            <View className={'items-start my-2 px-2'}>
              <Text className={'font-Tajawal text-left'}>{props.content}</Text>
            </View>
            {props.mediaType && (
              <View className={'mb-2 pl-2 w-full flex'}>
                <ImageModal
                  source={{ uri: props.image }}
                  isRTL
                  resizeMode={'cover'}
                  modalImageResizeMode={'contain'}
                  style={{
                    height: undefined,
                    width: '100%',
                    aspectRatio: 0.75
                  }}
                  renderImageComponent={({ source, resizeMode, style }) => (
                    <Image
                      recyclingKey={props.id.toString()}
                      className={'rounded-lg'}
                      style={style}
                      contentFit={resizeMode}
                      source={source}
                    />
                  )}
                />
              </View>
            )}
            {!props.alone && (
              <>
                <View className={'flex flex-row justify-end items-center my-1'}>
                  {props.repliesCount !== 0 && (
                    <Text className={'ml-1 font-TajawalMedium text-gray-600'}>
                      {props.repliesCount} تعليقات
                    </Text>
                  )}
                  <Text className={'ml-1 font-TajawalMedium text-gray-600'}>
                    {favoriteCount} إعجاب
                  </Text>
                </View>
                <View className={'my-2 h-0.5 bg-gray-200 rounded-full'} />
                <View
                  className={'flex flex-row gap-2 items-center justify-evenly'}
                >
                  <Pressable
                    className={'flex flex-row items-center'}
                    onPress={() => {
                      favorite()
                    }}
                  >
                    <MaterialIcons
                      name={isfavorited ? 'favorite' : 'favorite-border'}
                      size={24}
                      color={'#94a3b8'}
                    />
                    <Text className={'ml-1 font-TajawalMedium text-gray-600'}>
                      أعجبني
                    </Text>
                  </Pressable>
                  <Link
                    href={'/synbio/home/' + props.id}
                    asChild
                  >
                    <Pressable className={'flex flex-row items-center'}>
                      <MaterialIcons
                        name={'comment'}
                        size={24}
                        color={'#94a3b8'}
                      />
                      <Text className={'ml-1 font-TajawalMedium text-gray-600'}>
                        تعليق
                      </Text>
                    </Pressable>
                  </Link>
                  {/*                <View className={"flex flex-row items-center"}>
                    <MaterialIcons name={"bar-chart"} size={24} color={"#94a3b8"}/>
                    <Text className={"ml-1"}>{views}</Text>
                  </View>*/}
                </View>
              </>
            )}
          </Pressable>
        </Link>
      )}
    </>
  )
}
