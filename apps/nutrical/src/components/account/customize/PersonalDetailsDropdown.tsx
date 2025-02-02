import { View, Text } from 'react-native'

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger
} from '~/components/ui/Dropdown'

export default function PersonalDetailsDropdown(props: {
  title: string
  value: string
  onChangeText: (text: string) => void
}) {
  return (
    <View className="flex flex-row items-center justify-between p-4">
      <Text className="font-display text-lg">{props.title}</Text>
      <View className="flex flex-row items-center">
        <DropdownMenuRoot>
          <DropdownMenuTrigger>
            <View
              className={
                'flex flex-row justify-center items-center rounded-full bg-gray-300 p-1 mb-2'
              }
            >
              <Text className={'text-white font-display text-lg'}>
                {props.value}
              </Text>
            </View>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              key={'male'}
              onSelect={() => {
                props.onChangeText('male')
              }}
            >
              <DropdownMenuItemTitle>Male</DropdownMenuItemTitle>
            </DropdownMenuItem>
            <DropdownMenuItem
              key={'female'}
              onSelect={() => {
                props.onChangeText('Female')
              }}
            >
              <DropdownMenuItemTitle>Female</DropdownMenuItemTitle>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </View>
    </View>
  )
}
