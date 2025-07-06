import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Check } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Switch,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'

import type { GetServerSources, PutServerSourceConfig } from '@backend/types'

import useClient from '~/components/network/client'

export default function SourceManagement() {
  const client = useClient()
  const [selectedSources, setSelectedSources] = useState<GetServerSources>([])
  const [isSaving, setIsSaving] = useState(false)

  function handleSourceSelection(sourceId: number, isEnabled: boolean) {
    const serverSource = serverSources?.find((source) => source.id === sourceId)
    if (isEnabled && serverSource) {
      setSelectedSources((prev) => [...prev, serverSource])
    } else {
      setSelectedSources((prev) =>
        prev.filter((source) => source.id !== serverSource?.id)
      )
    }
  }

  const { data: serverSourcesData, mutate } = useSWR<
    { error: false; data: GetServerSources } | { error: true; message: string }
  >('serverConfig/sources')

  useEffect(() => {
    if (serverSourcesData?.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: serverSourcesData.message
      })
    }
  }, [serverSourcesData])

  const serverSources = serverSourcesData?.error
    ? undefined
    : serverSourcesData?.data

  // Set selectedSources once when serverSources data is available
  useEffect(() => {
    if (serverSources) {
      // Assuming serverSources is an array of source IDs like ['openfoodfacts']
      setSelectedSources(serverSources.filter((source) => source.enabled))
    }
  }, [serverSources])
  if (!serverSources) {
    return (
      <SafeAreaView className={'h-screen bg-gray-50'}>
        <View className={'flex flex-col items-center justify-center h-full'}>
          <Text className={'text-lg font-display-bold'}>
            Server Sources Not Found
          </Text>
        </View>
      </SafeAreaView>
    )
  }
  async function handleSave() {
    setIsSaving(true)
    try {
      const res = await client
        .put<
          | { error: false; data: PutServerSourceConfig }
          | { error: true; message: string }
        >('serverConfig/sources', {
          json: {
            ids: selectedSources.map((s) => s.id)
          }
        })
        .json()

      if (res.error) {
        Toast.show({ type: 'error', text1: res.message })
        return
      }
      Toast.show({ type: 'success', text1: 'Sources Saved' })
      mutate()
      router.back()
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: JSON.stringify(e) || 'An error occurred'
      })
    } finally {
      setIsSaving(false)
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6">
        <Text className={'font-display-bold text-gray-900 text-3xl mt-4 mb-2'}>
          Manage Sources
        </Text>
        <Text className={'font-display text-gray-600 text-base mb-8'}>
          Select the data sources to use for food information.
        </Text>
        <View className={'flex flex-col gap-4'}>
          {serverSources.map((source) => (
            <View
              key={source.id}
              className="flex-row items-center justify-between p-4 pr-10 bg-white border border-gray-200 rounded-lg"
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={{ uri: source.logoImageUrl }}
                  className="h-10 w-10 rounded-md"
                  contentFit="contain"
                />
                <Text className={'font-display-medium text-lg text-gray-800'}>
                  {source.name}
                </Text>
              </View>
              <Switch
                onValueChange={(value) => {
                  handleSourceSelection(source.id, value)
                }}
                value={selectedSources.some((s) => s.id === source.id)}
                trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                thumbColor={'#ffffff'}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-none">
        <Pressable
          className={
            'w-full flex-row items-center justify-center rounded-xl h-12 bg-green-600 disabled:bg-green-400'
          }
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Check
                size={20}
                color={'#ffffff'}
                className="mr-2"
              />
              <Text className={'font-display-semibold text-base text-white'}>
                Save Sources
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
