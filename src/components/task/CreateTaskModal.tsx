import { useState } from 'react';
import { ColorSchemeSelector } from '../common/ColorSchemeSelector';
import { COLOR_SCHEMES } from '@/utils/constants';
import axios from 'axios';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { SlideOne } from './SlideOne';
import { SlideTwo } from './SlideTwo';
import { KeyCombo, Keys } from '../common/KeyCombo';

export const CreateTaskModal = ({ onClose }: { onClose: () => void }) => {
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
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Low',
  });

  const handleUpdateColorScheme = (scheme: any) => {
    setColorScheme(scheme);
  };

  const handleCreateTask = async () => {
    if (!taskData.title || !taskData.description || !taskData.priority) return;
    try {
      const res = await axios.post('/api/tasks', {
        title: taskData.title,
        description: taskData.description,
        // priority: taskData.priority,
        colorScheme: {
          cardColor: colorScheme.cardColor,
          textColor: colorScheme.textColor,
        },
      });
    } catch (error) {
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
            <SlideTwo />
          )}
          {activeSlide === 1 ? (
            <div className="flex items-center gap-2">
              <BiLeftArrow
                color="white"
                className="absolute bottom-4 left-4"
                onClick={() => setActiveSlide(0)}
              />
              <BiRightArrow
                color="white"
                className="absolute bottom-4 right-4 cursor-pointer"
                onClick={handleCreateTask}
              />
            </div>
          ) : (
            <BiRightArrow
              color="white"
              className="absolute bottom-4 right-4"
              onClick={() => setActiveSlide(1)}
            />
          )}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <ColorSchemeSelector
            handleUpdateColorScheme={handleUpdateColorScheme}
          />
        </div>
      </div>

      {/* Footer section */}
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
