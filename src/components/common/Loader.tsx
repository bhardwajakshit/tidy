import { motion } from 'framer-motion';

export const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-3xl font-semibold"
      >
        .
      </motion.span>
    </div>
  );
};
