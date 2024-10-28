"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { TaskCard } from "../components/common/TaskCard";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import { AnimatePresence } from "framer-motion";
import { CreateTaskModal } from "../components/task/CreateTaskModal";

export const devGoalsData = [
  {
    id: 1,
    // colorScheme: {
    //   bgColor: "bg-[#222222]",
    //   textColor: "text-white",
    // },
    bgColor: "bg-[#222222]",
    textColor: "text-white",
    title: "Learn TypeScript",
    description:
      "Complete an online course on TypeScript to strengthen typing in React projects.",
    priority: "High",
    date: "2024-11-05",
  },
  {
    id: 2,
    bgColor: "bg-[#c9c9c0]",
    textColor: "text-gray-900",
    title: "Contribute to Open Source",
    description:
      "Find a project to contribute to and submit at least one pull request.",
    priority: "Medium",
    date: "2024-11-15",
  },
  {
    id: 3,
    bgColor: "bg-[#967e76]",
    textColor: "text-white",
    title: "Optimize Portfolio Website",
    description:
      "Improve loading speed and add new projects to showcase recent work.",
    priority: "High",
    date: "2024-11-20",
  },
  {
    id: 4,
    bgColor: "bg-[#99a98e]",
    textColor: "text-black",
    title: "Build a Side Project",
    description:
      "Start a small app with Next.js and Tailwind to add to my portfolio.",
    priority: "Medium",
    date: "2024-12-01",
  },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState(devGoalsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef(null) as RefObject<HTMLDivElement>;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") {
        e.preventDefault();
        setIsModalOpen(true);
      }

      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, []);

  return (
    <AnimatePresence>
      <div
        className="flex h-screen w-screen flex-col items-center justify-center bg-[#f8f7f1]"
        ref={ref}
      >
        <Header />

        {tasks.map((goal) => (
          <TaskCard
            key={goal.id}
            bgColor={goal.bgColor}
            textColor={goal.textColor}
            title={goal.title}
            description={goal.description}
            priority={goal.priority}
            date={goal.date}
            ref={ref}
          />
        ))}

        {isModalOpen && (
          <CreateTaskModal onClose={() => setIsModalOpen(false)} />
        )}

        <Footer />
      </div>
    </AnimatePresence>
  );
}
