import { motion } from 'framer-motion';

export const LandingFooter = () => {
  return (
    <motion.div
      className="absolute bottom-2 flex items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 3.6,
        ease: 'easeOut',
      }}
    >
      <p
        className="cursor-default text-xs font-normal text-tidy-black/30 transition-all duration-300 hover:text-tidy-black/80"
        aria-label="Tidy copyright notice"
      >
        Tidy © {new Date().getFullYear()}
      </p>
      <span
        className="text-xs font-normal text-tidy-black/30"
        aria-hidden="true"
      >
        |
      </span>
      <a
        href="https://tidy.run/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-normal text-tidy-black/30 transition-all duration-300 hover:text-tidy-black/80"
        aria-label="View Tidy's privacy policy"
      >
        Privacy Policy
      </a>
    </motion.div>
  );
};
