import { CameraView, useCameraPermissions } from 'expo-camera'
import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'

export default function BarcodeAdd() {
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission()
    }
  }, [permission])

  const handleBarCodeScanned = ({
    type,
    data
  }: {
    type: string
    data: string
  }) => {
    setScanned(true)
    Toast.show({
      type: 'info',
      text1: 'Barcode Scanned!',
      text2: `Type: ${type}, Data: ${data}`
    })
    // Here you would typically make an API call to find the food by its barcode
    // and then navigate to a food details page.
    // e.g., router.push(`/nutrical/food-details?barcode=${data}`);
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center p-4">
        <Text className="text-center text-lg font-display mb-4">
          We need your permission to show the camera
        </Text>
        <Button
          onPress={requestPermission}
          title="Grant Permission"
        />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'qr']
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <View className="absolute top-0 left-0 right-0 p-4 pt-12 bg-black/30">
        <View className="flex flex-row justify-between items-center">
          <Pressable
            onPress={() => router.back()}
            className="p-2"
          >
            <ChevronLeft
              size={24}
              color={'#FFFFFF'}
            />
          </Pressable>
          <Text className="text-xl font-display-semibold text-white">
            Scan Barcode
          </Text>
          <View className="w-8" />
        </View>
      </View>

      <View className="absolute inset-0 justify-center items-center">
        <View className="w-64 h-32 border-2 border-white rounded-lg" />
        <Text className="text-white font-display mt-4">
          Align barcode within the frame
        </Text>
      </View>

      {scanned && (
        <View className="absolute bottom-0 left-0 right-0 p-8 bg-black/50">
          <Button
            title={'Tap to Scan Again'}
            onPress={() => setScanned(false)}
            color="#FFFFFF"
          />
        </View>
      )}
    </View>
  )
}
