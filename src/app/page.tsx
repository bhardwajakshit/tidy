"use client";

import TypewriterText from "@/components/common/StaggerText";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useSupabase } from "@/utils/providers/auth-provider";
import { LandingFooter } from "@/components/common/LandingFooter";

export default function Auth() {
  const { signInWithGoogle } = useSupabase();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-10" />

      <div className="flex flex-col items-center justify-center flex-grow">
        <TypewriterText text="tidy." className="text-3xl font-semibold" />
      </div>

      <motion.button
        onClick={signInWithGoogle}
        className="flex items-center gap-2 text-sm font-normal py-2 px-8 text-tidy-black/80 bg-stone-200/60 hover:bg-stone-200 transition-colors duration-300 rounded-md mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 3.4 }}
      >
        <FcGoogle size={20} />
        Continue with Google
      </motion.button>
      <LandingFooter />
    </div>
  );
}
