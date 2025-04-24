import { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { TaskData } from './CreateTaskModal';

const PRIORITIES = ['Low', 'Medium', 'High'];

export const SlideTwo = ({
  taskData,
  setTaskData,
}: {
  taskData: TaskData;
  setTaskData: Dispatch<SetStateAction<TaskData>>;
}) => {
  const handlePriorityChange = (priority: TaskData['priority']) => {
    setTaskData((prev) => ({ ...prev, priority }));
  };

  const getPriorityColor = (level: string) => {
    switch (level) {
      case 'Low':
        return { bg: 'bg-emerald-500', text: 'text-emerald-700' };
      case 'Medium':
        return { bg: 'bg-amber-500', text: 'text-amber-700' };
      case 'High':
        return { bg: 'bg-rose-500', text: 'text-rose-700' };
      default:
        return { bg: 'bg-gray-300', text: 'text-gray-700' };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-lg font-medium">Task Priority</h1>
      <div className="mt-4 w-full max-w-xs">
        <div className="relative flex rounded-full bg-white/10 p-1 backdrop-blur-md">
          {PRIORITIES.map((level) => {
            const isActive = taskData.priority === level;
            const { bg, text } = getPriorityColor(level);

            return (
              <div key={level} className="relative flex-1">
                <input
                  type="radio"
                  name="priority"
                  id={`priority-${level}`}
                  value={level}
                  checked={isActive}
                  onChange={() =>
                    handlePriorityChange(level as TaskData['priority'])
                  }
                  className="absolute h-0 w-0 opacity-0"
                />
                <label
                  htmlFor={`priority-${level}`}
                  className={`flex h-10 w-full cursor-pointer flex-col items-center justify-center rounded-full text-xs font-medium ${
                    isActive && text
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="priority-background"
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <motion.div
                    className={`relative mb-1 h-1.5 w-1.5 rounded-full ${isActive ? bg : 'bg-gray-500'}`}
                    animate={{
                      scale: isActive ? 1.2 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                  <span className="relative z-10">{level}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
