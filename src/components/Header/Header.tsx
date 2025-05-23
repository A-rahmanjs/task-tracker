
import { Plus } from 'react-feather'
import { useTaskContext } from '../../context/TaskContext'

function Header() {
  const { handleAddTask } = useTaskContext();
  
  return (
    <nav className="flex flex-row justify-between p-7 border-b-1">
      <div className="title">
        <h1 className='text-2xl font-bold'>TASK TRACKER</h1>
      </div>
      <button
        onClick={handleAddTask}
        className="ml-2 px-3 py-1 cursor-pointer rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center"
      >
        <Plus /> Add Task
      </button>
    </nav>
  );
}

export default Header;
