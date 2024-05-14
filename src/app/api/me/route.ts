import { tokens } from '@/app/api/auth/route'

export async function GET(request: Request) {
  const headers = request.headers
  const authorization = headers.get('Authorization')?.replace('Bearer ', '')

  if (authorization !== String(tokens.accessToken)) {
    return new Response('Unauthorized', { status: 401 })
  }

  await new Promise((resolve) => setTimeout(resolve, 500))

  return Response.json({
    id: 42,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    color: '#a4b5e4',
  })
}
