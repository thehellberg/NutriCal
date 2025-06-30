import { ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { View, Text, Pressable } from 'react-native'

import type { ProgramTemplates } from '@backend/types'
export default function CatalogCard(props: {
  program: ProgramTemplates[number]
}) {
  return (
    <Link
      href={`/nutrical/programs/${props.program.id}`}
      asChild
    >
      <Pressable>
        <ImageBackground
          source={props.program.cardImageUrl}
          contentFit="contain"
          contentPosition={'right'}
          //style={{ backgroundColor: props.program.startColor || '#023030' }}
          className="overflow-hidden rounded-lg mr-4 h-full w-full"
        >
          <LinearGradient
            colors={[
              props.program.startColor || '#023030',
              props.program.endColor || '#023030'
            ]}
            className="absolute top-0 left-0 w-full h-full -z-10"
          />
          <View className="py-2 pl-4 w-40 flex flex-col items-start justify-start mr-20">
            <Text
              style={{ color: props.program.contentColor || '#000' }}
              className="text-sm font-display-medium"
            >
              {props.program.programTemplateTags[0]?.tag.name.toUpperCase()}
            </Text>
            <Text
              style={{ color: props.program.contentColor || '#000' }}
              className="text-2xl mt-6 font-display"
            >
              {props.program.name}
            </Text>
            <Text
              style={{ color: props.program.contentColor || '#000' }}
              className="text-sm mb-10 font-display mt-1"
            >
              {props.program.shortDescription}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Link>
  )
}
