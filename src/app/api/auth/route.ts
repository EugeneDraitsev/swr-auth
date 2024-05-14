import { TOKENS } from '@/app/api/server.constants'

export async function GET() {
  // sleep for 1 second
  await new Promise((resolve) => setTimeout(resolve, 500))
  return Response.json({ ...TOKENS })
}
