import { useState } from 'react';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  const addTask = (text) => {
    const newTask = {
      id: taskIdCounter,
      text: text.trim(),
      completed: false
    };
    
    setTasks(prev => [...prev, newTask]);
    setTaskIdCounter(prev => prev + 1);
  };

  const toggleTask = (taskId) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask
  };
}