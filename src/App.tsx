import './App.css';
import Header from './components/Header/Header'
import ControlPanel from './components/ControlPanel/ControlPanel';
import SideBar from './components/SideBar/SideBar';
import { TaskProvider } from './context/TaskContext';


function App() {
  return (
      <TaskProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <Header />
          <div className="sidebar-controlpanel-container grid grid-cols-[1fr_6fr] gap-4 p-4">
            <SideBar/>
            <ControlPanel />
          </div>
        </div>
      </TaskProvider>
  )
}

export default App