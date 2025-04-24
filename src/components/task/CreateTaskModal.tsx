import { Dispatch, SetStateAction, useState } from 'react';
import { ColorSchemeSelector } from '../common/ColorSchemeSelector';
import { COLOR_SCHEMES } from '@/utils/constants';
import axios from 'axios';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { SlideOne } from './SlideOne';
import { SlideTwo } from './SlideTwo';
import { KeyCombo, Keys } from '../common/KeyCombo';
import { Task } from '@/app/home/page';
import { ClipLoader } from 'react-spinners';

export type TaskData = {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
};

export const CreateTaskModal = ({
  onClose,
  updateTasks,
}: {
  onClose: () => void;
  updateTasks: Dispatch<SetStateAction<Task[]>>;
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [colorScheme, setColorScheme] = useState<{
    cardColor: string;
    textColor: string;
    placeholderTextColor: string;
  }>({
    cardColor: COLOR_SCHEMES[0].cardColor,
    textColor: COLOR_SCHEMES[0].textColor,
    placeholderTextColor: COLOR_SCHEMES[0].placeholderTextColor,
  });
  const [taskData, setTaskData] = useState<TaskData>({
    title: '',
    description: '',
    priority: 'Low',
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleUpdateColorScheme = (scheme: any) => {
    setColorScheme(scheme);
  };

  const handleCreateTask = async () => {
    if (!taskData.title || !taskData.priority) return;

    try {
      setIsCreating(true);
      const res = await axios.post('/api/tasks', {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        cardColor: colorScheme.cardColor,
        textColor: colorScheme.textColor,
      });

      updateTasks((prevTasks) => [...prevTasks, res.data]);
      onClose();
    } catch (error) {
      setIsCreating(false);
      console.error(error);
    }
  };

  return (
    <div className="absolute left-0 top-0 z-[60] flex h-full w-full flex-col backdrop-blur-sm">
      <div className="flex flex-grow flex-col items-center justify-center">
        <div
          className={`relative flex h-64 w-[400px] flex-col rounded-xl p-4 shadow-lg ${colorScheme.cardColor} ${colorScheme.textColor}`}
        >
          {activeSlide === 0 ? (
            <SlideOne
              taskData={taskData}
              setTaskData={setTaskData}
              colorScheme={colorScheme}
            />
          ) : (
            <SlideTwo taskData={taskData} setTaskData={setTaskData} />
          )}

          {activeSlide === 1 ? (
            <div className="flex items-center justify-between gap-2">
              <div onClick={() => setActiveSlide(0)}>
                <FaCircleChevronLeft
                  color="white"
                  className="absolute bottom-4 left-4 cursor-pointer"
                />
              </div>
              {isCreating ? (
                <ClipLoader
                  color="white"
                  size={18}
                  speedMultiplier={0.4}
                  className="absolute bottom-4 right-4"
                />
              ) : (
                <div onClick={handleCreateTask}>
                  <FaCircleChevronRight
                    color="white"
                    className="absolute bottom-4 right-4 cursor-pointer"
                  />
                </div>
              )}
            </div>
          ) : (
            taskData.title && (
              <FaCircleChevronRight
                color="white"
                className="absolute bottom-4 right-4 cursor-pointer"
                onClick={() => setActiveSlide(1)}
              />
            )
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <ColorSchemeSelector
            handleUpdateColorScheme={handleUpdateColorScheme}
          />
        </div>
      </div>

      <div className="mt-auto flex w-full items-center justify-center p-6">
        <div className="flex items-center justify-center gap-2">
          <p className="text-primary/60 text-xs font-normal">Press</p>
          <KeyCombo keyNames={[Keys.Escape]} />
          <p className="text-primary/60 text-xs font-normal">to discard.</p>
        </div>
      </div>
    </div>
  );
};
