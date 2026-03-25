import type React from "react";
import { useMenu, type Anchor, type Direction } from "./Context";
import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

type MenuContainerProps = {
  buttonSize?: number;
  menuWidth?: number;
  menuRadius?: number;
  className?: string;
  children: React.ReactNode;
};

export function MenuContainer({
  buttonSize = 42,
  menuWidth = 160,
  menuRadius = 12,
  className,
  children,
}: MenuContainerProps) {
  const { open, direction, anchor, menuRef } = useMenu();

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // auto height measurement
  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(([e]) =>
      setContentHeight(e.contentRect.height),
    );
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const width = open ? menuWidth : buttonSize;
  const height = open ? contentHeight : buttonSize;

  function getPlacement(
    direction: Direction,
    anchor: Anchor,
  ): React.CSSProperties {
    const style: React.CSSProperties = {};

    if (direction === "top") style.bottom = 0;
    if (direction === "bottom") style.top = 0;
    if (direction === "left") style.right = 0;
    if (direction === "right") style.left = 0;

    if (direction === "top" || direction === "bottom") {
      if (anchor === "start") style.left = 0;
      if (anchor === "end") style.right = 0;
      if (anchor === "center") style.left = "50%";
    }

    if (direction === "left" || direction === "right") {
      style.top = "50%";
    }

    return style;
  }

  function getOffset(direction: Direction, offset: number) {
    switch (direction) {
      case "top":
        return { x: 0, y: -offset };
      case "bottom":
        return { x: 0, y: offset };
      case "left":
        return { x: -offset, y: 0 };
      case "right":
        return { x: offset, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  }

  const placement = getPlacement(direction, anchor);
  const needsCentering =
    anchor === "center" || direction === "left" || direction === "right";
  const offset = getOffset(direction, buttonSize);

  return (
    <div style={{ width: buttonSize, height: buttonSize }}>
      {/* PLACEMENT */}
      <div style={placement} className="absolute">
        {/* CENTERING (static transform, never animated) */}
        <div
          style={
            needsCentering
              ? {
                  transform:
                    direction === "top" || direction === "bottom"
                      ? "translateX(-50%)"
                      : "translateY(-50%)",
                }
              : undefined
          }
        >
        <motion.div
          ref={menuRef}
          initial={false}
          animate={{
            width,
            height,
            x: open ? offset.x : 0,
            y: open ? offset.y : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            // mass: 0.8,
          }}
        >
          {/* MASK */}
          <motion.div
            initial={false}
            animate={{ borderRadius: open ? menuRadius : buttonSize / 2 }}
            transition={{
              // delay radius change
              duration: 0.001,
              delay: open ? 0.1 : 0,
            }}
            className={twMerge(
              "w-full h-full overflow-hidden bg-white",
              className,
            )}
          >
            {/* content wrapper for measuring */}
            <div ref={contentRef}>{children}</div>
          </motion.div>
        </motion.div>
      </div>
      </div>
    </div>
  );
}
