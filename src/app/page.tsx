'use client'

import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/navigation'

import { SWR_ACCESS_TOKEN } from '@/constants'
import { setCookie } from '@/utils'

export default function Home() {
  const router = useRouter()
  const { trigger, isMutating } = useSWRMutation(SWR_ACCESS_TOKEN, async () => {
    const { accessToken, refreshToken } = await fetch('/api/auth').then((x) =>
      x.json(),
    )

    setCookie('accessToken', accessToken)
    setCookie('refreshToken', refreshToken)
    router.push('/dashboard')
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        disabled={isMutating}
        className="border px-6 py-2 rounded disabled:opacity-50"
        onClick={() => trigger()}
      >
        {isMutating ? 'Loading...' : 'Login'}
      </button>
    </main>
  )
}
