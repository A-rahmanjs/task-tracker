import { useTaskContext } from '../../context/TaskContext';
import React from 'react';

type select = 'All' | 'Completed' | 'Non-Completed';

function SideBar() {
    const { setFiltered, tasks, handleDeleteAllTasks } = useTaskContext();
 
    const [selected, setSelected] = React.useState<select>("All");

    React.useEffect(() => {
        if (tasks.length === 0) {
            setSelected("All");
            setFiltered("All");
        }
    }, [tasks.length, setFiltered]);

    return (
        <div>
            <div className="flex flex-col p-4 space-y-2">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Filters</h3>
                
                <button 
                    className={`w-full px-4 py-2 text-left rounded-md transition-colors ${
                        selected === "All" 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => {
                        setFiltered("All");
                        setSelected("All");
                    }}
                >
                    All Tasks
                </button>

                <button 
                    className={`w-full px-4 py-2 text-left rounded-md transition-colors ${
                        selected === "Completed"
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    } ${
                        tasks.filter(task => task.completed).length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => {
                        setFiltered("Completed");
                        setSelected("Completed");
                    }}
                    disabled={tasks.filter(task => task.completed).length === 0}
                >
                    Completed
                </button>

                <button 
                    className={`w-full px-4 py-2 text-left rounded-md transition-colors ${
                        selected === "Non-Completed"
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    } ${
                        tasks.filter(task => !task.completed).length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => {
                        setFiltered("Non-Completed");
                        setSelected("Non-Completed");
                    }}
                    disabled={tasks.filter(task => !task.completed).length === 0}
                >
                    Incomplete
                </button>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => {
                            handleDeleteAllTasks();
                            setSelected("All");
                        }}
                        disabled={tasks.length === 0}
                        className={`w-full px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors ${
                            tasks.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Delete All Tasks
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SideBar;