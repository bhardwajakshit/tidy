import { motion } from "framer-motion";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { Tooltip } from "./Tooltip";
import { useSupabase } from "@/utils/providers/auth-provider";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user, signOut } = useSupabase();
  const router = useRouter();
  const [showItems, setShowItems] = useState<boolean>(false);

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
            onClick={() => router.push("/profile")}
            className="flex items-center justify-center gap-2 relative group"
            variants={itemVariants}
          >
            <Image
              src={user?.image || ""}
              alt="Profile"
              className="rounded-full"
              width={20}
              height={20}
            />
            <Tooltip text="Profile" />
          </motion.button>

          <motion.button
            onClick={() => signOut()}
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
