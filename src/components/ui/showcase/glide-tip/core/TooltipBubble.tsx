import type React from "react";
import { motion } from "motion/react";
import type { Transition } from "motion";
import type { Direction } from "./types";
import { twMerge } from "tailwind-merge";

interface TooltipBubbleProps {
  isVisible: boolean;
  tooltipX: number;
  width: number;
  offset: number;
  direction: Direction;
  tooltipClassName: string;
  tooltipTransition: {
    x?: Transition;
    width?: Transition;
    opacity?: Transition;
  };
  contentTransition: Transition;
  children: React.ReactNode;
}

export default function TooltipBubble({
  isVisible,
  tooltipX,
  width,
  offset,
  direction,
  tooltipClassName,
  tooltipTransition,
  contentTransition,
  children,
}: TooltipBubbleProps) {
  const directionClass =
    direction === "bottom" ? "top-full mt-4" : "bottom-full mb-4";

  return (
    <motion.div
      initial={false}
      animate={{
        x: tooltipX,
        width,
        opacity: isVisible ? 1 : 0,
      }}
      transition={tooltipTransition}
      className={twMerge(
        `pointer-events-none absolute left-0 z-50 overflow-hidden rounded-xl
          border border-black/10 bg-[hsl(0deg_0%_97%)] text-neutral-900 shadow-sm `,
        directionClass,
        tooltipClassName,
      )}
    >
      <motion.div
        animate={{ x: -offset }}
        transition={contentTransition}
        className="flex"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
