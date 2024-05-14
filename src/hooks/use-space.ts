import useSWR from 'swr/immutable'

import { getCookie } from '@/utils'
import { SWR_SPACE } from '@/constants'

export const useSpace = () => {
  return useSWR(SWR_SPACE, async (url) => {
    const accessToken = getCookie('accessToken')
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized')
      }
      throw new Error('An error occurred')
    }

    return response.json()
  })
}
