import { useCallback, useEffect, useState, type RefObject } from "react";
import type { Alignment, GlideTipItem } from "./types";

export function useTooltipController(
  items: GlideTipItem[],
  widths: number[],
  align: Alignment,
  controlsRef: RefObject<(HTMLDivElement | null)[]>,
  containerRef: RefObject<HTMLDivElement | null>,
) {
  const [active, setActive] = useState<number | null>(null);
  const [lastActive, setLastActive] = useState(0);
  const [tooltipX, setTooltipX] = useState(0);

  const activeIndex =
    items.length === 0 ? 0 : Math.min(active ?? lastActive, items.length - 1);

  const updatePosition = useCallback(() => {
    const control = controlsRef.current[activeIndex];
    const container = containerRef.current;
    if (!control || !container) return;

    const controlRect = control.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const left = controlRect.left - containerRect.left;
    const controlWidth = controlRect.width;
    const tooltipWidth = widths[activeIndex] ?? 0;

    let x = left + controlWidth / 2 - tooltipWidth / 2; // default center

    if (align === "smart") {
      if (activeIndex === 0) {
        // align left edges
        x = left;
      } else if (activeIndex === items.length - 1) {
        // align right edges
        x = left + controlWidth - tooltipWidth;
      }
    }

    setTooltipX((prev) => (prev === x ? prev : x));
  }, [activeIndex, widths, align, items.length, controlsRef, containerRef]);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  const offset = widths.slice(0, activeIndex).reduce((acc, w) => acc + w, 0);

  return {
    active,
    setActive,
    lastActive,
    setLastActive,
    activeIndex,
    tooltipX,
    offset,
    updatePosition,
  };
}
