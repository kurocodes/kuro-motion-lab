import type React from "react";
import { useMenu } from "./Context";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

export function MenuContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useMenu();
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      // transition={{ delay: 0.15 }}
      className={twMerge(className)}
    >
      {children}
    </motion.div>
  );
}
