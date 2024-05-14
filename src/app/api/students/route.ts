import { tokens } from '@/app/api/auth/route'

export async function GET(request: Request) {
  const headers = request.headers
  const authorization = headers.get('Authorization')?.replace('Bearer ', '')

  if (authorization !== String(tokens.accessToken)) {
    return new Response('Unauthorized', { status: 401 })
  }

  await new Promise((resolve) => setTimeout(resolve, 750))

  const requestParams = new URL(request.url).searchParams
  const spaceId = requestParams.get('spaceId')
  const userId = requestParams.get('userId')

  if (userId === '42' && spaceId === '1') {
    return Response.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
      { id: 3, name: 'John Smith' },
      { id: 4, name: 'Jane Smith' },
    ])
  }

  return Response.json([])
}
