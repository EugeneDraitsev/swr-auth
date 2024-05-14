import useSWR from 'swr/immutable'

import { getCookie } from '@/utils'
import { useSpace } from '@/hooks/use-space'
import { useMe } from '@/hooks/use-me'
import { SWR_STUDENTS } from '@/constants'

export const useStudents = () => {
  const { data: space } = useSpace()
  const { data: me } = useMe()

  const spaceId = space?.id
  const userId = me?.id

  return useSWR(
    spaceId && userId
      ? `${SWR_STUDENTS}?spaceId=${spaceId}&userId=${userId}`
      : null,
    async (url) => {
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
    },
  )
}
