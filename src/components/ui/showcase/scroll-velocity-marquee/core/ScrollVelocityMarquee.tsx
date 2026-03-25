import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useMemo, useRef } from "react";
import { useResize } from "./useResize";
import "./index.css";

interface ScrollVelocityMarqueeProps {
  children: React.ReactNode;
  baseVelocity?: number;
}

export function ScrollVelocityMarquee({
  children,
  baseVelocity = 10,
}: ScrollVelocityMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Measure wrapper + one copy of the content
  const [wrapperRef, wrapperSize] = useResize();
  const [contentRef, contentSize] = useResize();

  // Dynamically calculate copies needed
  const copies = useMemo(() => {
    if (contentSize.width === 0 || wrapperSize.width === 0) return 4;
    return Math.ceil(wrapperSize.width / contentSize.width) + 2;
  }, [contentSize.width, wrapperSize.width]);

  const directionRef = useRef<1 | -1>(1);

  // Animate marquee
  useAnimationFrame((_t, delta) => {
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionRef.current = -1;
    else if (velocityFactor.get() > 0) directionRef.current = 1;

    moveBy += directionRef.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  // Pixel-based wrapping
  const x = useTransform(baseX, (v) => `${wrap(-contentSize.width, 0, v)}px`);

  return (
    <div className="parallax" ref={wrapperRef}>
      <motion.div className="scroller" style={{ x }}>
        {Array.from({ length: copies }).map((_, i) => (
          <span key={i} ref={i === 0 ? contentRef : null}>
            {children}&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
}