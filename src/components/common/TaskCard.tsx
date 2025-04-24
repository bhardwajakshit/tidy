import {
  RefObject,
  useMemo,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Task } from '@/app/home/page';
import { BsTrash } from 'react-icons/bs';
import { formatDateWithSuffix } from '@/utils/utils';
import { FaCircleChevronLeft } from 'react-icons/fa6';

export const TaskCard = ({
  ref,
  task,
  setTasks,
}: {
  ref: RefObject<HTMLDivElement>;
  task: Task;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const dragTransition = { timeConstant: 50, power: 0.1 };

  useEffect(() => {
    const minTop = 200;
    const maxTop = window.innerHeight - 340;
    const randomTop = Math.random() * (maxTop - minTop) + minTop;

    const minLeft = 20;
    const maxLeft = window.innerWidth - 380;
    const randomLeft = Math.random() * (maxLeft - minLeft) + minLeft;

    setPosition({
      top: (randomTop / window.innerHeight) * 100,
      left: (randomLeft / window.innerWidth) * 100,
    });
  }, []);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch('/api/tasks', {
        id: task.id,
        notes: [...task.notes, note],
      });

      setNote('');
      setTasks((prevTasks: Task[]) => {
        const updatedTasks = prevTasks.map((t: Task) => {
          if (t.id === task.id) {
            return {
              ...t,
              notes: [...t.notes, note],
            };
          }
          return t;
        });
        return updatedTasks;
      });
    } catch {
      console.error('Error adding note');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('/api/tasks', {
        data: { id: task.id },
      });
      setTasks((prevTasks: Task[]) =>
        prevTasks.filter((t: Task) => t.id !== task.id),
      );
    } catch {
      console.error('Error deleting task');
    }
  };

  const variants = useMemo(() => {
    return {
      start: {
        top: '50%',
        left: '50%',
        opacity: 0,
      },
      end: {
        top: `${position.top}%`,
        left: `${position.left}%`,
        opacity: 1,
        transition: {
          duration: 1.2,
          delay: Math.random() * 0.5,
        },
      },
      hover: {
        zIndex: 2,
        cursor: 'pointer',
      },
      dragging: {
        zIndex: 2,
        cursor: 'grabbing',
      },
    };
  }, [position]);

  const handleClick = () => {
    if (!isDragging && !isFlipped) {
      setIsFlipped(true);
    }
  };

  const formattedDate = formatDateWithSuffix(task.createdAt);

  return (
    <motion.div
      className="absolute h-60 w-[360px] [perspective:1000px]"
      variants={variants}
      initial="start"
      animate="end"
      whileHover="hover"
      whileTap="dragging"
      drag
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setTimeout(() => setIsDragging(false), 100);
      }}
      dragConstraints={ref as RefObject<HTMLDivElement>}
      dragTransition={dragTransition}
    >
      <div
        className={`relative h-full w-full cursor-pointer transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        onClick={handleClick}
      >
        <div
          className={`absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(0deg)] ${task.cardColor} ${task.textColor} flex flex-col justify-between rounded-lg p-4 text-sm font-normal shadow-md`}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">{task.title}</h3>
            <p className="flex-1 font-mono">{task.description}</p>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span>{task.priority} Priority</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        <div
          className={`absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] ${task.cardColor} ${task.textColor} flex flex-col rounded-lg p-4 text-sm font-normal shadow-md`}
        >
          <div className="mb-2 flex justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="hover:opacity-70"
              >
                <FaCircleChevronLeft size={16} />
              </button>
              <h3 className="text-base font-medium">Notes</h3>
            </div>

            <button onClick={handleDelete} className="hover:opacity-70">
              <BsTrash size={16} />
            </button>
          </div>

          <div className="mb-2 flex-1 space-y-2 overflow-auto">
            {task.notes.length > 0 &&
              task.notes.map((note, index) => (
                <div key={index} className="rounded bg-black/10 p-2">
                  {note}
                </div>
              ))}
          </div>

          <form onSubmit={handleAddNote} className="flex gap-2">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 rounded bg-black/10 px-2 py-1 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="Add a note..."
            />
            <button
              type="submit"
              onClick={(e) => e.stopPropagation()}
              className="rounded bg-black/10 px-3 py-1 hover:bg-black/20"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
