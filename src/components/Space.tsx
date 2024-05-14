import { useSpace } from '@/hooks/use-space'

export const Space = () => {
  const { data: space, isLoading, error } = useSpace()

  if (error) {
    return <div>{error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="mt-2">
      <div>id: {space.id}</div>
      <div>name: {space.name}</div>
    </div>
  )
}
