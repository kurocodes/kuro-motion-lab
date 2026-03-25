import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function useScrollAnimation() {
  const ref = useRef<HTMLLIElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 55%", "end 45%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1.2, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [-87, 0, -87]);

  return { ref, scale, opacity, x };
}
