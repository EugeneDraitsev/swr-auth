'use client'

import { useRouter } from 'next/navigation'
import { eraseCookie, setCookie } from '@/utils'
import { useMe } from '@/hooks/use-me'
import { Space } from '@/components/Space'
import { Students } from '@/components/Students'

export default function Dashboard() {
  const router = useRouter()
  const { data: me, isLoading, error } = useMe()

  const logout = () => {
    eraseCookie('accessToken')
    eraseCookie('refreshToken')
    router.push('/')
  }

  const breakCookies = () => {
    setCookie('accessToken', 'ahjkfsdhjk')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Dashboard
      <div className="flex gap-4">
        <div className="border p-4">
          <div className="flex gap-2">
            Data from <pre>useMe</pre>
          </div>
          <div>
            {me && (
              <div className="mt-2">
                <div>{me.name}</div>
                <div>{me.color}</div>
              </div>
            )}
            {isLoading && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
          </div>
        </div>
        <div className="border p-4 flex-1">
          <div className="flex gap-2">
            Data from <pre>{`useSwr('/space')`}</pre>
          </div>
          <Space />
        </div>
      </div>
      <Students />
      <div className="flex gap-4">
        <button
          className="border px-6 py-2 rounded"
          onClick={() => breakCookies()}
        >
          Break Cookies
        </button>
        <button className="border px-6 py-2 rounded" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </main>
  )
}
