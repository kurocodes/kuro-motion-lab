import { motion } from "motion/react";

export const StaggeredText = ({ value }: { value: string }) => {
  const container = {
    initial: {},
    hovered: {},
  };

  const childVariants = {
    initial: { y: 0 },
    hovered: { y: "-100%" },
  };

  const childVariants2 = {
    initial: { y: "100%" },
    hovered: { y: 0 },
  };

  const DURANTION = 0.25;
  const STAGGER = 0.025;

  return (
    <motion.div
      variants={container}
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-[hsl(180,100%,30%)] font-black text-4xl sm:text-7xl md:text-8xl uppercase"
      style={{ lineHeight: 0.9 }}
    >
      <div className="flex">
        <div>
          {value.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={childVariants}
              transition={{
                duration: DURANTION,
                ease: "easeInOut",
                delay: i * STAGGER,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="absolute inset-0">
        <div>
          {value.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={childVariants2}
              transition={{
                duration: DURANTION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
