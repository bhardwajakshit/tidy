import { RefObject, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TaskCard = ({
  bgColor,
  textColor,
  title,
  description,
  priority,
  date,
  ref,
}: {
  bgColor: string;
  textColor: string;
  title: string;
  description: string;
  priority: string;
  date: string;
  ref: RefObject<HTMLDivElement>;
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
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

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (notes.trim()) {
      setSavedNotes([...savedNotes, notes.trim()]);
      setNotes("");
    }
  };

  const variants = useMemo(() => {
    return {
      start: {
        top: "50%",
        left: "50%",
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
        cursor: "pointer",
      },
      dragging: {
        zIndex: 2,
        cursor: "grabbing",
      },
    };
  }, [position]);

  const handleClick = () => {
    if (!isDragging && !isFlipped) {
      setIsFlipped(true);
    }
  };

  return (
    <motion.div
      className="w-[360px] h-60 absolute [perspective:1000px]"
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
        className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] cursor-pointer
          ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
        onClick={handleClick}
      >
        <div
          className={`absolute w-full h-full [transform:rotateY(0deg)] [backface-visibility:hidden]
            ${bgColor} ${textColor} text-sm font-normal rounded-lg p-4 shadow-md flex flex-col justify-between`}
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="flex-1 font-mono">{description}</p>
          </div>
          <div className="flex justify-between mt-2">
            <span>{priority} Priority</span>
            <span className="text-xs">{date}</span>
          </div>
        </div>

        <div
          className={`absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden]
            ${bgColor} ${textColor} text-sm font-normal rounded-lg p-4 shadow-md flex flex-col`}
        >
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold text-base">Notes for {title}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="hover:opacity-70"
            >
              ←
            </button>
          </div>

          <div className="flex-1 overflow-auto mb-2 space-y-2">
            {savedNotes.map((note, index) => (
              <div key={index} className="p-2 bg-black/10 rounded">
                {note}
              </div>
            ))}
          </div>

          <form onSubmit={handleAddNote} className="flex gap-2">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 px-2 py-1 rounded bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="Add a note..."
            />
            <button
              type="submit"
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1 rounded bg-black/10 hover:bg-black/20"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
