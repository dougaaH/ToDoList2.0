import Link from 'next/link';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full fade-in">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            📋 To-Do List
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Organize suas tarefas de forma simples e rápida
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/login">
            <Button size="lg" className="w-full">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary" size="lg" className="w-full">
              Cadastrar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}