import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

interface DraggableCardProps {
  children: ReactNode;
  style?: CSSProperties;
}

const DraggableCards = ({ children, style }: DraggableCardProps) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={style}
      className="rounded-2xl shadow-lg p-5 m-2 w-52 h-72 flex items-center justify-center text-white text-xl"
    >
      {children}
    </motion.div>
  );
};

export default DraggableCards;
