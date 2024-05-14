import useSWR from 'swr/immutable'

import { getCookie } from '@/utils'
import { SWR_SESSION } from '@/constants'

export const useSession = () => {
  return useSWR(SWR_SESSION, async () => {
    const accessToken = getCookie('accessToken')
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    const [meResponse, spaceResponse] = await Promise.all([
      fetch('/api/me', { headers }),
      fetch('/api/space', { headers }),
    ])

    if (!meResponse.ok || !spaceResponse.ok) {
      if (meResponse.status === 401 || spaceResponse.status === 401) {
        throw new Error('Unauthorized')
      }
      throw new Error('An error occurred')
    }

    const me = await meResponse.json()
    const space = await spaceResponse.json()

    return { me, space }
  })
}
