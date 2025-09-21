import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask as deleteTaskService } from '../services/taskService';
import { useAuth } from '../context/AuthContext';

export default function useTasks() {
  // Assumindo que seu useAuth também tem um estado de loading. Se não, a lógica ainda é mais robusta.
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    // 1. Não faz nada se a autenticação ainda estiver carregando.
    if (authLoading) {
      setLoading(true);
      return;
    }

    // 2. Se a autenticação terminou e o usuário NÃO está logado, limpa tudo.
    if (!isAuthenticated) {
      setTasks([]);
      setLoading(false); // Para de carregar pois não há nada a buscar.
      return;
    }
    try {
      setLoading(true);
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTasks([]); // Limpa as tarefas em caso de erro
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]); // Agora depende do loading da autenticação também

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title) => {
    try {
      const { task: newTask } = await createTask(title);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
      throw new Error("Não foi possível adicionar a tarefa.");
    }
  };

  const toggleTask = async (taskId) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (!taskToUpdate) return;

    const { task: updatedTask } = await updateTask(taskId, { completed: !taskToUpdate.completed });
    setTasks(prev => prev.map(task => (task.id === taskId ? updatedTask : task)));
  };

  const deleteTask = async (taskId) => {
    await deleteTaskService(taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask
  };
}