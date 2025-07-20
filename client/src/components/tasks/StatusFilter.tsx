import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import type { TaskStatus } from '@/hooks/useTaskFilter'

const statuses: TaskStatus[] = ['all', 'completed', 'pending']

const labels: Record<TaskStatus, string> = {
  all: 'Todas',
  completed: 'Completadas',
  pending: 'Pendientes',
}

export default function StatusFilter({
  status,
  setStatus
}: {
  status: TaskStatus
  setStatus: (s: TaskStatus) => void
}) {
  return (
    <div className="w-48">
      <Listbox value={status} onChange={setStatus}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span className="block truncate">{labels[status]}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-white py-1 shadow-lg focus:outline-none">
            {statuses.map((s) => (
              <Listbox.Option
                key={s}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                  }`
                }
                value={s}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                    >
                      {labels[s]}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}
