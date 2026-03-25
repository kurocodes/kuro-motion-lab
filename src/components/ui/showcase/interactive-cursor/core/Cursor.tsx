import { motion, MotionValue, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CursorProps, HoverElementData } from "./type";
import "./index.css";

export function Cursor({
  size = 15,
  color = "hsl(0, 0%, 41%, 0.8)",
  stiffness = 400,
  damping = 35,
  spring = true,
}: CursorProps) {
  const HOVER_BG = "hsl(0, 0%, 41%, 0.1)";
  const DEFAULT_RADIUS = 9999;
  const hasFinePointer = window.matchMedia("(pointer:fine)").matches;

  const pointerX: MotionValue<number> = useMotionValue(-1000);
  const pointerY: MotionValue<number> = useMotionValue(-1000);

  const cursorX: MotionValue<number> = useSpring(pointerX, {
    stiffness,
    damping,
  });
  const cursorY: MotionValue<number> = useSpring(pointerY, {
    stiffness,
    damping,
  });

  const [isInViewport, setIsInViewport] = useState<boolean>(
    () => window.matchMedia("(pointer:fine)").matches,
  );
  const [hoverData, setHoverData] = useState<HoverElementData | null>(null);
  const lastHoveredElement = useRef<HTMLElement | null>(null);

  const half = size / 2;

  useEffect(() => {
    let hoverRect: DOMRect | null = null;

    const handleEnter = (e: PointerEvent) => {
      pointerX.set(e.clientX - size / 2);
      pointerY.set(e.clientY - size / 2);
      setIsInViewport(true);
    };

    const handleLeave = () => {
      setIsInViewport(false);
      lastHoveredElement.current = null;
      setHoverData(null);
    };

    const handleMove = (e: PointerEvent) => {
      if (!hoverData) {
        pointerX.set(e.clientX - half);
        pointerY.set(e.clientY - half);
      }

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>("[data-cursor]");

      if (interactive && interactive !== lastHoveredElement.current) {
        hoverRect = interactive.getBoundingClientRect();
        lastHoveredElement.current = interactive;

        pointerX.set(hoverRect.left);
        pointerY.set(hoverRect.top);

        const radius = parseFloat(getComputedStyle(interactive).borderRadius);

        setHoverData({
          width: hoverRect.width,
          height: hoverRect.height,
          x: hoverRect.x,
          y: hoverRect.y,
          borderRadius: radius,
          tagName: interactive.tagName,
        });
      } else if (!interactive && lastHoveredElement.current) {
        lastHoveredElement.current = null;
        hoverRect = null;
        setHoverData(null);
      }
    };

    document.addEventListener("pointerenter", handleEnter);
    document.addEventListener("pointerleave", handleLeave);
    document.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      document.removeEventListener("pointerenter", handleEnter);
      document.removeEventListener("pointerleave", handleLeave);
      document.removeEventListener("pointermove", handleMove);
    };
  }, [
    pointerX,
    pointerY,
    half,
    hoverData,
    stiffness,
    damping,
    hasFinePointer,
    size,
  ]);

  const motionX = spring || hoverData ? cursorX : pointerX;
  const motionY = spring || hoverData ? cursorY : pointerY;

  return (
    <motion.div
      layout
      layoutDependency={hoverData}
      className="cursor"
      style={{
        x: motionX,
        y: motionY,
        width: hoverData ? hoverData.width : size,
        height: hoverData ? hoverData.height : size,
        borderRadius: hoverData ? hoverData.borderRadius : DEFAULT_RADIUS,
        transformOrigin: "center",
        backgroundColor: hoverData ? HOVER_BG : color,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isInViewport ? 1 : 0,
        opacity: isInViewport ? 1 : 0,
      }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 35 },
        type: "spring",
        stiffness: 250,
        damping: 25,
      }}
    />
  );
}
