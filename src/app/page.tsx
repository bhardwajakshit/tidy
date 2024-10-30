"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import TypewriterText from "@/components/common/StaggerText";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function Auth() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await supabase.auth.getSession();

      if (!session.data.session) {
        router.push("/");
      }
    };

    fetchSession();
  }, [router]);

  const signInWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
        },
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center flex-grow">
        <TypewriterText text="tidy." className="text-3xl font-semibold" />
      </div>
      <motion.button
        onClick={signInWithGoogle}
        className="flex items-center gap-2 text-sm font-normal py-2 px-8 text-tidy-black/80 bg-stone-200/60 hover:bg-stone-200 transition-colors duration-300 rounded-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 3.4 }}
      >
        <FcGoogle size={20} />
        Continue with Google
      </motion.button>
    </div>
  );
}
