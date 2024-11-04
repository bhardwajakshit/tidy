"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { CreateTaskModal } from "@/components/task/CreateTaskModal";
import { TaskCard } from "@/components/common/TaskCard";
import { devGoalsData } from "@/utils/constants";

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
    <div
      className="flex h-screen w-screen flex-col items-center justify-center"
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

      {isModalOpen && <CreateTaskModal onClose={() => setIsModalOpen(false)} />}

      {!isModalOpen && <Footer />}
    </div>
  );
}
