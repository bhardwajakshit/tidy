'use client';

import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { useSupabase } from '@/utils/providers/auth-provider';
import { LandingFooter } from '@/components/common/LandingFooter';
import TypewriterText from '@/components/common/TypewriterText';

export default function Auth() {
  const { signInWithGoogle } = useSupabase();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-10" />

      <div className="flex flex-grow flex-col items-center justify-center gap-4">
        <TypewriterText text="tidy." className="text-3xl font-semibold" />
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 3.2 }}
          className="max-w-lg text-center text-base text-tidy-black/60"
        >
          Tidy is a simple and intuitive app designed to help you stay organized
          and productive. Track your tasks, set goals, and focus on making
          consistent progress with ease.
        </motion.p>
      </div>

      <motion.button
        onClick={signInWithGoogle}
        className="mb-10 flex items-center gap-2 rounded-md bg-stone-200/60 px-8 py-2 text-sm font-normal text-tidy-black/80 transition-colors duration-300 hover:bg-stone-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 3.4 }}
      >
        <FcGoogle size={20} />
        Continue with Google
      </motion.button>
      <LandingFooter />
    </div>
  );
}
