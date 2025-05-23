import React, { useState } from 'react'
import { Edit, Delete } from 'react-feather';
import { useTaskContext } from '../../context/TaskContext';

type TaskType = {
    task: string,
    id: string,
    completed: boolean,
    description: string
  };

type TaskProps = {
  task: TaskType
}

function Task({ task }: TaskProps) {
  const { handleChangeSpecificTask, handleCompleteTask, handleDeleteTask, handleEditDescription } = useTaskContext();
  const [edit, setEdit] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(task.completed);
  const ref = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    ref.current?.focus()
  }, [edit])

  return (
    <>
      {!edit ? (
        <div key={task.id} className="bg-white shadow-md rounded-lg p-4 mb-2 flex items-center justify-between">
            <div className="firstLayer w-full flex flex-col overflow-hidden">
                <div className="secondlayer flex flex-row">

          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
                setChecked(e.target.checked);
                handleCompleteTask(task.id, e.target.checked)
            }}
            className="w-10 h-10 mr-2 accent-blue-500 cursor-pointer"
            />

          <p className={`flex-1 text-2xl text-gray-800 ${checked ? 'line-through text-gray-400' : ''}`}>{task.task}</p>
            </div>
          <p className={`ml-13 flex-1 whitespace-normal text-gray-500 text-sm ${checked ? 'line-through text-gray-400' : ''}`}>{task.description == '' ? 'No description' : task.description}</p>
          </div>
            <div className="buttons flex flex-row">

          <button 
            onClick={() => setEdit(true)} 
            className="ml-2 px-3 cursor-pointer py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center"
            >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </button>
          <button 
            onClick={() => handleDeleteTask(task.id)} 
            className="ml-2 px-3 py-1 cursor-pointer rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center"
            >
            <Delete className="h-4 w-4 mr-1" /> Delete
          </button>
              </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 mb-2 flex items-center justify-between">
          <input
            type="text"
            value={task.task}
            placeholder='Enter task name'
            ref={ref}
            onChange={(e) => {
              handleChangeSpecificTask(task.id, e.target.value);
            }}
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            value={task.description}
            placeholder='Add description'
            ref={ref}
            onChange={(e) => {
              handleEditDescription(task.id, e.target.value);
            }}
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button 
            onClick={() => {
              setEdit(false) 
            }} 
            className="ml-2 px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            Save
          </button>
        </div>
      )}
    </>
  )
}

export default React.memo(Task);