import { useEffect, useState } from "react";
import type { MagneticOptions } from "./type";

export function useMagnetic<T extends HTMLElement>({
  maxX = 10,
  maxY = 6,
}: MagneticOptions = {}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState<T | null>(null);

  const attach = (el: T | null) => setTarget(el);

  const clamp = (value: number, max: number) =>
    Math.max(Math.min(value, max), -max);

  useEffect(() => {
    if (!target) return;

    let rect = target.getBoundingClientRect();

    const handleEnter = () => {
      rect = target.getBoundingClientRect();
    }

    const handleMove = (e: PointerEvent) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const dx = clamp(x - centerX, maxX);
      const dy = clamp(y - centerY, maxY);

      setOffset({ x: dx, y: dy });
    };

    const handleLeave = () => setOffset({ x: 0, y: 0 });

    target.addEventListener("pointerenter", handleEnter);
    target.addEventListener("pointermove", handleMove, { passive: true });
    target.addEventListener("pointerleave", handleLeave);

    return () => {
      target.removeEventListener("pointerenter", handleEnter);
      target.removeEventListener("pointermove", handleMove);
      target.removeEventListener("pointerleave", handleLeave);
    };
  }, [target, maxX, maxY]);

  return { offset, attach };
}
