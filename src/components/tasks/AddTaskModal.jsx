import { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function AddTaskModal({ isOpen, onClose, onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Tarefa">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Input
            label="Título da tarefa"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Digite sua tarefa..."
            required
            autoFocus
          />
        </div>
        
        <div className="flex space-x-3">
          <Button 
            type="button" 
            variant="ghost" 
            className="flex-1"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button type="submit" className="flex-1">
            Adicionar
          </Button>
        </div>
      </form>
    </Modal>
  );
}