import { motion } from "framer-motion";

export const LandingFooter = () => {
  return (
    <motion.div
      className="flex items-center gap-2 absolute bottom-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 3.6,
        ease: "easeOut",
      }}
    >
      <p
        className="text-xs font-normal text-tidy-black/30 hover:text-tidy-black/80 transition-all duration-300 cursor-default"
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
        className="text-xs font-normal text-tidy-black/30 hover:text-tidy-black/80 transition-all duration-300"
        aria-label="View Tidy's privacy policy"
      >
        Privacy Policy
      </a>
    </motion.div>
  );
};
