import { View, Text } from 'react-native'

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger
} from '~/components/ui/Dropdown'

export default function PersonalDetailsDropdown<T>(props: {
  title: string
  options: Array<[string, T]>
  value: T
  onChangeText: (value: T) => void
}) {
  return (
    <View className="flex flex-row items-center justify-between p-4">
      <Text className="font-display text-lg">{props.title}</Text>
      <View className="flex flex-row items-center">
        <DropdownMenuRoot>
          <DropdownMenuTrigger>
            <View className="flex flex-row justify-center items-center rounded-full bg-gray-300 p-1 mb-2">
              <Text className="text-white font-display text-lg">
                {`${props.value}`}
              </Text>
            </View>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {props.options.map((option) => (
              <DropdownMenuItem
                key={option[1]?.toString()}
                onSelect={() => {
                  props.onChangeText(option[1])
                }}
              >
                <DropdownMenuItemTitle>{option[0]}</DropdownMenuItemTitle>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </View>
    </View>
  )
}
