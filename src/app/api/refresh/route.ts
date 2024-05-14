import { TOKENS } from '@/app/api/server.constants'

export async function GET(request: Request) {
  const requestParams = new URL(request.url).searchParams
  const refreshToken = requestParams.get('refreshToken')

  if (refreshToken === String(TOKENS.refreshToken)) {
    return Response.json({ ...TOKENS })
  } else {
    return new Response('Unauthorized', { status: 401 })
  }
}
