import { useTaskContext } from '../../context/TaskContext';
import React from 'react';



function SideBar() {

    const { 
            setFiltered, 
            tasks, 
            handleDeleteAllTasks, 
            setSelected, 
            selected 
        } = useTaskContext();
 
    

    React.useEffect(() => {
        if (tasks.length === 0) {
            setSelected("All");
            setFiltered("All");
        }
    }, [tasks.length, setFiltered, setSelected]);

    return (
        <div className="sidebar-container">
            <div className="sidebar-content flex flex-col p-4 space-y-2">
                <h3 className="sidebar-title text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Filters</h3>
                
                <button 
                    className={`filter-btn w-full px-4 py-2 text-left rounded-md transition-colors ${
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
                    className={`filter-btn w-full px-4 py-2 text-left rounded-md transition-colors ${
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
                <button 
                    className={`filter-btn w-full px-4 py-2 text-left rounded-md transition-colors ${
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
                    Complete
                </button>

                <div className="sidebar-footer mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => {
                            handleDeleteAllTasks();
                            setSelected("All");
                        }}
                        disabled={tasks.length === 0}
                        className={`delete-all-btn w-full px-4 py-2 rounded-md text-white bg-red-600/70 hover:bg-red-700/70 transition-colors ${
                            tasks.length === 0 ? 'opacity-50 cursor-not-allowed dark:bg-white dark:text-black hover:bg-white hover:text-black' : ''
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