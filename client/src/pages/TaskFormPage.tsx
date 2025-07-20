import useTaskFormPage from '@/hooks/useTaskFormPage'
import TaskForm from '@/components/tasks/TaskForm'
import Spinner from '@/components/ui/Spinner'

export default function TaskFormPage() {
  const { initial, loading, fetching, handleSubmit } = useTaskFormPage()

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-40 gap-2 text-gray-500">
        <Spinner size={24} />
        <span>Cargando tarea...</span>
      </div>
    )
  }

  return <TaskForm initial={initial} onSubmit={handleSubmit} loading={loading} />
}
