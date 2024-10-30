import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const TypewriterText = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isBlinking, setIsBlinking] = useState<boolean>(true);

  useEffect(() => {
    const initialPause = setTimeout(() => {
      setIsBlinking(false);
      let charIndex = -1;

      const typeInterval = setInterval(() => {
        if (charIndex < text.length - 1) {
          setDisplayedText((prev) => prev + text[charIndex]);
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 200);
    }, 2000);

    return () => {
      clearTimeout(initialPause);
    };
  }, [text]);

  return (
    <motion.div className={`${className} flex items-center`}>
      <span>{displayedText}</span>
      {isBlinking && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0] }}
          transition={{ duration: 2, repeat: 0 }}
          className="ml-1"
        >
          .
        </motion.span>
      )}
    </motion.div>
  );
};

export default TypewriterText;
