import type { ReactNode } from "react";
import { useCardMotion } from "./useCardMotion";
import { motion } from "motion/react";

interface DraggableCardProps {
  children: ReactNode;
  onSendToBack: () => void;
  className?: string;
}

export default function DraggableCard({
  children,
  onSendToBack,
  className,
}: DraggableCardProps) {
  const { x, y, rotateX, rotateY, handleDragEnd } = useCardMotion(onSendToBack);

  return (
    <motion.div
      layout
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
