export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="bg-white rounded-lg custom-shadow p-4 hover-scale transition-all duration-200 slide-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span
            className={`text-gray-800 flex-1 ${
              task.completed ? "task-complete" : ""
            }`}
          >
            {task.title}
          </span>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
          title="Excluir tarefa"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
