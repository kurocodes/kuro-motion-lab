import { motion } from "motion/react";

type MarqueeTextProps = {
  children: React.ReactNode;
  hovered?: boolean;
  speed?: number; // pixels per second
};

export default function MarqueeText({
  children,
  hovered,
  speed = 50,
}: MarqueeTextProps) {
  return (
    <div className="relative">
      <motion.div
        className="flex w-max"
        animate={hovered ? { x: ["0%", "-50%"] } : { x: "0%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: speed,
        }}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center">{children}</div>
      </motion.div>
    </div>
  );
}
