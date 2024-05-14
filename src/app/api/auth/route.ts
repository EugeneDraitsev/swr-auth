export let tokens = {
  accessToken: 1715702628008,
  refreshToken: 1715702628008,
}

export async function GET() {
  // sleep for 1 second
  await new Promise((resolve) => setTimeout(resolve, 500))
  return Response.json({ ...tokens })
}
