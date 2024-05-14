import useSWR from 'swr/immutable'

import { getCookie } from '@/utils'
import { SWR_ME } from '@/constants'

export const useMe = () => {
  return useSWR(SWR_ME, async (url) => {
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
