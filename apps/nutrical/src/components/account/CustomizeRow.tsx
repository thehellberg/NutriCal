import { Pressable, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link } from 'expo-router'

export default function CustomizeRow({ title, icon, href }) {
  return (
    <Link
      href={href}
      asChild
    >
      <Pressable
        className={'flex flex-row items-center w-full justify-between'}
      >
        <View className={'flex flex-row items-center'}>
          <MaterialIcons
            name={icon}
            size={28}
            color={'#16a34a'}
          />
          <Text className={'font-display-medium text-lg pt-1 ml-1'}>
            {title}
          </Text>
        </View>
        <MaterialIcons
          name={'keyboard-arrow-left'}
          size={24}
          color={'#6b7280'}
        />
      </Pressable>
    </Link>
  )
}
