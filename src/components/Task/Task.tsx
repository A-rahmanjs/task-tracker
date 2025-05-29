import React, { useState, type FormEvent } from 'react'
import { Save, Edit, Delete, Smile, Meh, AlertCircle } from 'react-feather';
import { useTaskContext } from '../../context/TaskContext';
import type { TaskType } from '../../context/TaskContext';

type TaskProps = {
  task: TaskType
};


function Task({ task }: TaskProps) {
  const {
    taskName,
    id,
    description,
    completed,
    priority,
    isEditing
  } = task
  const { handlePriority, handleEditTaskName, handleEndEdit, handleStartEdit, handleCompleteTask, handleDeleteTask, handleEditDescription } = useTaskContext();
  const [localTaskName, setLocalTaskName] = useState(taskName);
  const [localDescription, setLocalDescription] = useState(description);
  const [localPriority, setLocalPriority] = useState<'High' | 'Normal' | 'Low'>(priority)
  const [checked, setChecked] = useState<boolean>(completed);
  const ref = React.useRef<HTMLInputElement | null>(null);
  const descriptionRef = React.useRef<HTMLInputElement | null>(null);
  const entireTestRef = React.useRef<HTMLFormElement | null>(null)
  React.useEffect(() => {
    
    ref.current?.focus()
  }, [isEditing])

  React.useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLocalTaskName(taskName); // Reset unsaved task name
        setLocalDescription(description); // Reset description
        setLocalPriority(priority); // Reset priority
        handleEndEdit(id); // Exit edit mode
      }
    }
  
    if (isEditing) {
      document.addEventListener("keydown", handleEsc);
    }
  
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [id, isEditing, taskName, description, priority, handleEndEdit]);
  

  if (!isEditing) {
    return (
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
      }} className="p-2">
        <div className={`${completed ? 'dark:bg-green-900/30 bg-green-100' : 'dark:bg-gray-700 bg-white'} shadow-md rounded-lg p-4 transition-colors duration-200`}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={localTaskName.length <= 0}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                    handleCompleteTask(id, e.target.checked);
                  }}
                  className="w-5 h-5 mr-3 mt-1 accent-blue-500 cursor-pointer flex-shrink-0"
                />
                <p className={` flex-1 font-bold text-lg ${checked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-100' } ${priority === "High" ? 'dark:text-red-500/70' : priority === "Normal" ? "dark:text-yellow-500" : 'dark:text-green-500'}` }>
                  {localTaskName.length > 0 ? localTaskName : <span className="text-gray-400 dark:text-gray-500">Unnamed Task</span>}
                </p>
              </div>
              <div className="ml-8 mt-1">
                {localTaskName !== "" ? (
                  <div 
                    ref={descriptionRef}
                    title={localDescription} 
                    className={`cursor-default whitespace-normal text-sm ${checked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {localDescription || 'No description'}
                  </div>
                ) : (
                  <p className="whitespace-normal text-sm text-gray-400 dark:text-gray-500">
                    Unnamed Tasks can't have descriptions
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 ml-4">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                localPriority === 'High' 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' 
                  : localPriority === 'Normal' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' 
                    : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
              }`}>
                <div className="flex items-center">
                  {localPriority === 'High' ? (
                    <AlertCircle className="h-3.5 w-3.5 mr-1" />
                  ) : localPriority === 'Normal' ? (
                    <Meh className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <Smile className="h-3.5 w-3.5 mr-1" />
                  )}
                  {localPriority}
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => handleStartEdit(id)} 
                  className="p-2 rounded-md dark:hover:bg-yellow-900/50 hover:cursor-pointer dark:text-gray-300  transition-colors"
                  aria-label="Edit task"
                >
                  <Edit className="h-4 w-4 text-yellow-200 hover:opacity-100" />
                </button>
                <button 
                  onClick={() => handleDeleteTask(id)} 
                  className="p-2 rounded-md text-red-600 hover:bg-red-100 hover:cursor-pointer dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
                  aria-label="Delete task"
                >
                  <Delete className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
      handleEditTaskName(id, localTaskName);
      handleEditDescription(id, localDescription);
      handlePriority(id, localPriority)
      handleEndEdit(id);
      e.preventDefault();
  }}
  ref={entireTestRef}
  className="p-2"
>

      <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 mb-2 transition-colors duration-200">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={checked}
              disabled={taskName.length <= 0}
              onChange={(e) => {
                setChecked(e.target.checked);
                handleCompleteTask(id, e.target.checked);
              }}
              className="w-5 h-5 accent-blue-500 cursor-pointer flex-shrink-0"
            />
            <input
              type="text"
              value={localTaskName}
              placeholder='Enter task name'
              maxLength={60}
              ref={ref}
              onChange={(e) => setLocalTaskName(e.target.value)}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="ml-9">
            <textarea
              value={localDescription}
              placeholder='Add description'
              maxLength={480}
              onChange={(e) => setLocalDescription(e.target.value)}
           
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              rows={3}
            />
          </div>

          <div className="flex justify-between items-center ml-9">
            <div className="flex items-center space-x-2">
              <label htmlFor='priority' className="text-gray-700 dark:text-gray-300">Priority: </label>
              <select 
                name="priority" 
                id="priority"
                value={localPriority}
                onChange={(e) => {
                  const newPriority = e.target.value as 'High' | 'Normal' | 'Low';
                  setLocalPriority(newPriority);

                }}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-white"
              >
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <button 
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-1" /> Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default React.memo(Task);