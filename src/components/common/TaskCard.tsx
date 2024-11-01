import { motion } from "framer-motion";
import { RefObject, useMemo } from "react";

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
  const dragTransition = { timeConstant: 50, power: 0.1 };
  const variants = useMemo(() => {
    return {
      start: {
        top: `${Math.random() * 120 - 20}%`,
        left: `${Math.random() * 120 - 20}%`,
        opacity: 0,
      },
      end: {
        top: `${50 + Math.random() * 10}%`,
        left: `${50 + Math.random() * 10}%`,
        opacity: 1,
        transition: {
          duration: 1.2,
          delay: Math.random() * 0.5,
          // type: "spring",
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
  }, []);

  return (
    <motion.div
      className={`w-[360px] h-60 ${bgColor} ${textColor} text-sm font-normal rounded-lg p-4 shadow-md flex flex-col justify-between absolute`}
      layout
      variants={variants}
      initial="start"
      animate="end"
      whileHover="hover"
      whileTap="dragging"
      drag
      dragConstraints={ref as RefObject<HTMLDivElement>}
      dragTransition={dragTransition}
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="flex-1 font-mono">{description}</p>
      </div>
      <div className="flex justify-between mt-2">
        <span>{priority} Priority</span>
        <span className="text-xs">{date}</span>
      </div>
    </motion.div>
  );
};
