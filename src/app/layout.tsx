'use client'

// import type { Metadata } from 'next'
import { SWRConfig } from 'swr'
import { Inter } from 'next/font/google'
import './globals.css'
import { getCookie, memoize, setCookie } from '@/utils'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

const refreshAccessToken = memoize(async (refreshToken: string) => {
  return fetch(`/api/refresh?refreshToken=${refreshToken}`).then((res) => {
    if (!res.ok) {
      throw new Error('Unauthorized')
    }

    return res.json()
  })
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SWRConfig
        value={{
          onErrorRetry: async (
            error,
            key,
            config,
            revalidate,
            { retryCount },
          ) => {
            // Only retry up to 2 times.
            if (retryCount >= 2) {
              return
            }

            if (error?.message === 'Unauthorized') {
              const refreshToken = getCookie('refreshToken')
              if (!refreshToken) {
                return
              }

              const newTokens = await refreshAccessToken(refreshToken)

              setCookie('accessToken', newTokens.accessToken)
              setCookie('refreshToken', refreshToken)
              setTimeout(() => revalidate({ retryCount }), 500)

              return
            }

            setTimeout(() => revalidate({ retryCount }), 1_500)
          },
        }}
      >
        <body className={inter.className}>{children}</body>
      </SWRConfig>
    </html>
  )
}
