import ky from 'ky'
import { useMemo } from 'react'

import { useStorageState } from '~/hooks/useStorageState'

export default function useClient(_token?: string | null | undefined) {
  const [[, token]] = useStorageState('token')

  return useMemo(
    () =>
      ky.create({
        prefixUrl: process.env.EXPO_PUBLIC_API_BASE, // + "v1"
        headers: {
          Authorization: `Bearer ${token || _token}`,
          'User-Agent': 'Nutrical-Mobile'
        }
      }),
    [_token, token]
  )
}
