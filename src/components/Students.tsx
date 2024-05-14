import { useStudents } from '@/hooks/use-students'

export const Students = () => {
  const {
    data: students,
    isLoading,
    error,
    isValidating,
    mutate,
  } = useStudents()

  if (error) {
    return <div>{error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="border p-4 flex items-center justify-between gap-4">
      {!isValidating && (
        <div className="flex-1">
          <h1 className="font-semibold mb-2">Students:</h1>
          <ul>
            {students?.map((student: any) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </div>
      )}
      {isValidating && <div>Validating...</div>}
      <button className="border px-6 py-2 rounded" onClick={() => mutate()}>
        Refetch
      </button>
    </div>
  )
}
