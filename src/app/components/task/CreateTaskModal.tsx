import { useState } from "react";
import { ColorSchemeSelector } from "../common/ColorSchemeSelector";
import { COLOR_SCHEMES } from "@/app/utils/constants";
import axios from "axios";

export const CreateTaskModal = ({ onClose }: { onClose: () => void }) => {
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
    title: "",
    description: "",
    priority: "Low",
  });

  const handleUpdateColorScheme = (scheme: any) => {
    setColorScheme(scheme);
  };

  const handleCreateTask = async () => {
    if (!taskData.title || !taskData.description || !taskData.priority) return;
    try {
      const res = await axios.post("/api/tasks", {
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
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center backdrop-blur-sm z-60">
      <div
        className={`flex flex-col w-[400px] h-64 rounded-xl p-4 shadow-lg ${colorScheme.cardColor} ${colorScheme.textColor}`}
      >
        <textarea
          className={`w-full h-10 p-2 rounded-md resize-none bg-transparent outline-none ${colorScheme.placeholderTextColor}`}
          placeholder="What's on your mind?"
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />
        <textarea
          className={`w-full h-20 p-2 rounded-md resize-none bg-transparent outline-none font-mono ${colorScheme.placeholderTextColor}`}
          placeholder="Description (optional)"
          onChange={(e) =>
            setTaskData({ ...taskData, description: e.target.value })
          }
        />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <ColorSchemeSelector
          handleUpdateColorScheme={handleUpdateColorScheme}
        />
      </div>
    </div>
  );
};
