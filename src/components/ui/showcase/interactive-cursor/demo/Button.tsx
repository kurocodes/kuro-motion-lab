import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useMagnetic } from "../core";

export default function Button() {
  const MAX_OFFSET_X = 5; 
  const MAX_OFFSET_Y = 3; 
  const SPRING_STIFFNESS = 300;
  const SPRING_DAMPING = 35;
  const BUTTON_SIZE = { width: 24, height: 24 }; 

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { offset, attach } = useMagnetic<HTMLButtonElement>({ maxX: MAX_OFFSET_X, maxY: MAX_OFFSET_Y })

  useEffect(() => {
    if (buttonRef.current) attach(buttonRef.current);
  }, [attach])


  return (
    <motion.button
      data-cursor="hover"
      ref={buttonRef}
      animate={{ x: offset.x, y: offset.y }}
      transition={{
        type: "spring",
        stiffness: SPRING_STIFFNESS,
        damping: SPRING_DAMPING,
      }}
      className="text-[hsl(210,100%,52%)] dark:text-[hsl(210,100%,48%)] select-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={BUTTON_SIZE.width}
        height={BUTTON_SIZE.height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17V7h10" />
        <path d="M17 17 7 7" />
      </svg>
      <span>Hover Here</span>
    </motion.button>
  );
}
