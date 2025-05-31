
import { Plus } from 'react-feather'
import { useTaskContext } from '../../context/TaskContext'



function Header() {
  const { handleAddTask } = useTaskContext();


  return (
    <nav className="app-header flex flex-row justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <div className="app-logo title">
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>TASK TRACKER</h1>
      </div>
      <div className="app-controls flex items-center space-x-4">
        <button
          onClick={() => {
            handleAddTask()
          }}
          className="add-task-btn px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 flex items-center space-x-2 active:scale-95 hover:cursor-pointer"
        >
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
