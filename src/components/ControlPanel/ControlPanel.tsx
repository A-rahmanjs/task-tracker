
import Task from '../Task/Task'
import { useTaskContext } from '../../context/TaskContext'

function ControlPanel() {
  const { filteredTasks } = useTaskContext();
  return (
    <div 
      className="task-panel rounded-lg p-5 space-y-1 overflow-hidden w-full h-full bg-gray-50 dark:bg-gray-800 transition-colors duration-200" 
      
    >
      {filteredTasks.length > 0 ? (
        <div className="task-list space-y-2">
          {[...filteredTasks].reverse().map(task => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <p className="empty-message text-center text-gray-400 dark:text-gray-500">No tasks yet</p>
      )}
    </div>
  ) 
}

export default ControlPanel