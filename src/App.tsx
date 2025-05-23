
import Header from './components/Header/Header'
import ControlPanel from './components/ControlPanel/ControlPanel';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <Header />
      <ControlPanel />
    </TaskProvider>
  )
}

export default App