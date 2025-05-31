import React, { createContext, useState, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export type TaskType = {
  taskName: string,
  id: string,
  completed: boolean,
  description: string,
  priority: 'High' | 'Normal' | 'Low',
  isEditing: boolean
};
//
type select = 'All' | 'Completed' | 'Non-Completed';
type filterType = "All" | "Completed" | "Non-Completed"
//
interface TaskContextType {
  tasks: TaskType[];
  filtered: filterType;
  selected: select
  filteredTasks: TaskType[];
//
  handlePriority: (id: string, newPrio: 'High' | 'Normal' | 'Low') => void;
  handleDeleteAllTasks: () => void;
  handleEndEdit: (id:string) => void;
  handleStartEdit: (id:string) => void;
  handleAddTask: () => void;
  handleEditTaskName: (id: string, newValue: string) => void;
  handleCompleteTask: (id: string, complete: boolean) => void;
  handleDeleteTask: (id: string) => void;
  handleEditDescription: (id: string, newDescription: string) => void;
  setFiltered: (filtered: filterType) => void;
  setSelected: (selected: select) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// eslint-disable-next-line 
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: React.ReactNode;
}

////////////////////
export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
//
  const {setItem, getItem} = useLocalStorage('tasks')
  const stored = getItem();
  const initialTasks: TaskType[] = Array.isArray(stored) ? stored : [];
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);
  const [filtered, setFiltered] = useState<filterType>("All")
  const [selected, setSelected] = React.useState<select>("All");
//
  const filteredTasks = tasks.filter(task => {
    if (filtered === "Completed") return task.completed;
    if (filtered === "Non-Completed") return !task.completed;
    return true;
  });
//
useEffect(() => {
  setItem(tasks)
}, [setItem, tasks])
//
   const handleAddTask = () => {
    setTasks(prevTasks => {
      const newTask: TaskType = {
        taskName: `Task #${prevTasks.length + 1}`,
        description: '',
        id: crypto.randomUUID(),
        isEditing: true,
        completed: false,
        priority: 'Normal'
      };
      return [
        ...prevTasks.map(task => ({
          ...task,
          isEditing: false
        })),
        newTask
      ];
    });
  };
//  
  const handleEditTaskName = (id: string, newValue: string) => {
  setTasks(prevTasks => prevTasks.map(task => 
    task.id === id 
      ? { ...task, taskName: newValue } 
      : task
  ));
};
//
  const handleEditDescription = (id: string, newDescription: string) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id 
        ? { ...task, description: newDescription } 
        : task
    ));
  };
//  
  const handleCompleteTask = (id: string, complete: boolean) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id 
        ? { ...task, completed: complete } 
        : task
    ));
  };
//
  const handlePriority = (id: string, newPrio: 'High' | 'Normal' | 'Low') => {
  console.log("handlePriority called with:", id, newPrio);
  setTasks(prevTasks => {
    return prevTasks.map(task =>
      task.id === id ? { ...task, priority: newPrio } : task
    );
  });
};
//
  const handleStartEdit = (id: string) => {
  setTasks(prevTasks => prevTasks.map(task =>
    task.id === id
      ? { ...task, isEditing: true }
      : task
  ));
};
//
  const handleEndEdit = (id: string) => {
  setTasks(prevTasks => prevTasks.map(task =>
    task.id === id
      ? { ...task, isEditing: false }
      : task
  ));
};
//
  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
//
  const handleDeleteAllTasks = () => {
    setTasks([])
  }
//
  const value = {
    tasks,
    filtered,
    selected,
    filteredTasks,
    handlePriority,
    handleDeleteAllTasks,
    handleStartEdit,
    handleEndEdit,
    setFiltered,
    handleAddTask,
    handleEditTaskName,
    handleCompleteTask,
    handleDeleteTask,
    handleEditDescription,
    setSelected,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
