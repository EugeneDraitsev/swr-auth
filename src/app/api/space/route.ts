import { TOKENS } from '@/app/api/server.constants'

export async function GET(request: Request) {
  const headers = request.headers
  const authorization = headers.get('Authorization')?.replace('Bearer ', '')

  if (authorization !== String(TOKENS.accessToken)) {
    return new Response('Unauthorized', { status: 401 })
  }

  await new Promise((resolve) => setTimeout(resolve, 1_500))

  return Response.json({ id: 1, name: 'My cool spaceId' })
}
