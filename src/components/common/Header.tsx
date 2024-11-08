import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { Tooltip } from "./Tooltip";

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showItems, setShowItems] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getUser();

      if (user.data.user) {
        setUser(user.data.user);
      }
    };

    fetchUser();
  }, []);

  const handleSignout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex items-center justify-center w-full p-6 gap-2">
      <motion.h1
        className="text-sm font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Tidy
      </motion.h1>
      <motion.button
        onClick={() => setShowItems(!showItems)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <BsThreeDots />
      </motion.button>
      {showItems && (
        <motion.div
          className="flex items-center justify-center gap-3 relative"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.button
            className="flex items-center justify-center gap-2 relative group"
            variants={itemVariants}
          >
            <Image
              src={user?.user_metadata?.avatar_url}
              alt="Profile"
              className="rounded-full"
              width={20}
              height={20}
            />
            <Tooltip text="Profile" />
          </motion.button>

          <motion.button
            onClick={handleSignout}
            className="flex items-center justify-center gap-2 relative group"
            variants={itemVariants}
          >
            <FiLogOut size={20} />
            <Tooltip text="Log out" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
