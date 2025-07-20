import type { TaskFormProps } from '@/interfaces/task.type'
import { useTaskForm } from '@/hooks/useTaskForm'

export default function TaskForm({ initial, onSubmit, loading }: TaskFormProps) {
  const { register, handleSubmit, errors, textareaRef, handleInput } = useTaskForm(initial)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-4"
    >
      <div>
        <label className="block mb-1 font-semibold">Título</label>
        <input
          {...register('title')}
          placeholder="Título"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-semibold">Descripción</label>
        <textarea
          {...register('description')}
          placeholder="Descripción"
          ref={(e) => {
            register('description').ref(e)
            textareaRef.current = e
          }}
          onInput={handleInput}
          className="w-full border border-gray-300 rounded px-3 py-2 overflow-hidden resize-none"
          style={{ minHeight: '80px' }}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {initial && (
        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register('completed')} />
          <label>Completada</label>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  )
}
