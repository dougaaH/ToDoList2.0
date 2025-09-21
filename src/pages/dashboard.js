import { useState } from 'react';
import useTasks from '../hooks/useTasks';
import TaskCard from '../components/tasks/TaskCard';
import AddTaskModal from '../components/tasks/AddTaskModal';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white custom-shadow sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">📋 To-Do List</h1>
          <button
            onClick={logout}
            className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
          >
            Sair
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Suas Tarefas</h2>
          <p className="text-gray-500">Mantenha-se organizado e produtivo</p>
        </div>

        {/* Tasks Container */}
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskCard
              key={task.id} // Prisma usa 'id' por padrão
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma tarefa ainda
            </h3>
            <p className="text-gray-500 mb-6">
              Adicione sua primeira tarefa para começar!
            </p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="floating-btn bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full custom-shadow hover-scale transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={addTask}
      />
    </div>
  );
}