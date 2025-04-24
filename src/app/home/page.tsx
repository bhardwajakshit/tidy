'use client';

import { useEffect, useState, useRef } from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { CreateTaskModal } from '@/components/task/CreateTaskModal';
import { TaskCard } from '@/components/common/TaskCard';
import axios from 'axios';
import { Loader } from '@/components/common/Loader';

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  notes: string[];
  cardColor: string;
  textColor: string;
  createdAt: Date;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get('/api/tasks');
        const data = await response.data;
        setTasks(data);
      } catch (error) {
        setIsFetching(false);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        setIsModalOpen(true);
      }

      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);

  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center"
      ref={ref}
    >
      <Header />

      {!isFetching && tasks.length === 0 ? (
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-xl font-bold">No tasks yet.</h1>
        </div>
      ) : tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task.id} ref={ref} task={task} setTasks={setTasks} />
        ))
      ) : (
        <Loader />
      )}

      {isModalOpen && (
        <CreateTaskModal
          onClose={() => setIsModalOpen(false)}
          updateTasks={setTasks}
        />
      )}

      {!isModalOpen && <Footer />}
    </div>
  );
}
