import { motion } from 'framer-motion';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import { Tooltip } from './Tooltip';
import { useSupabase } from '@/utils/providers/auth-provider';
import { useRouter } from 'next/navigation';

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
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex w-full items-center justify-center gap-2 p-6">
      <motion.h1
        className="cursor-pointer text-sm font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => router.push('/home')}
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
          className="relative flex items-center justify-center gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.button
            onClick={() => router.push('/profile')}
            className="group relative flex items-center justify-center gap-2"
            variants={itemVariants}
          >
            <Image
              src={user?.image || ''}
              alt="Profile"
              className="rounded-full"
              width={20}
              height={20}
            />
            <Tooltip text="Profile" />
          </motion.button>

          <motion.button
            onClick={() => signOut()}
            className="group relative flex items-center justify-center gap-2"
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
