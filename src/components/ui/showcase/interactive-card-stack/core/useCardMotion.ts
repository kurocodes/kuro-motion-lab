import { useMotionValue, useTransform, type PanInfo } from "motion/react";

export function useCardMotion(onThresholdReached: () => void) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  const handleDragEnd = (_: never, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 200 || Math.abs(info.offset.y) > 200) {
      x.set(0);
      y.set(0);
      onThresholdReached?.();
    } else {
      x.set(0);
      y.set(0);
    }
  };

  return { x, y, rotateX, rotateY, handleDragEnd };
}
