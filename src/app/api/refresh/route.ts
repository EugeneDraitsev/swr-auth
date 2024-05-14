import { tokens } from '@/app/api/auth/route'

export async function GET(request: Request) {
  const requestParams = new URL(request.url).searchParams
  const refreshToken = requestParams.get('refreshToken')

  if (refreshToken === String(tokens.refreshToken)) {
    return Response.json({ ...tokens })
  } else {
    return new Response('Unauthorized', { status: 401 })
  }
}
