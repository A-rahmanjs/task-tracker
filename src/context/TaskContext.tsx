import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the Task type with 'completed' property as per the memory
export type TaskType = {
  task: string,
  id: string,
  completed: boolean,
  description: string
};

interface TaskContextType {
  tasks: TaskType[];
  handleAddTask: () => void;
  handleChangeSpecificTask: (id: string, newValue: string) => void;
  handleCompleteTask: (id: string, complete: boolean) => void;
  handleDeleteTask: (id: string) => void;
  handleEditDescription: (id: string, newDescription: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
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

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const handleAddTask = () => {
    const newTask = {
      task: 'New Task',
      description: '',
      id: crypto.randomUUID(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleChangeSpecificTask = (id: string, newValue: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, task: newValue } 
        : task
    ));
  };

  const handleCompleteTask = (id: string, complete: boolean) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: complete } 
        : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditDescription = (id: string, newDescription: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, description: newDescription } 
        : task
    ));
  };

  const value = {
    tasks,
    handleAddTask,
    handleChangeSpecificTask,
    handleCompleteTask,
    handleDeleteTask,
    handleEditDescription,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
