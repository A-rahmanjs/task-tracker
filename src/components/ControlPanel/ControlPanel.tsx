
import Task from '../Task/Task'
import { useTaskContext } from '../../context/TaskContext'

function ControlPanel() {
  // Get tasks and handlers from context
  const { tasks } = useTaskContext();
    
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <form className="space-y-4">
        <div className="space-y-2">
          {tasks.map((task) => (
            <Task 
              key={task.id} 
              task={task}
            />
          ))}
        </div>
      </form>
    </div>
  ) 
}

export default ControlPanel