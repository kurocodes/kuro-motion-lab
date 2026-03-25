import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import "./index.css";

interface BlockSliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  label?: string;
  onChange?: (value: number) => void;
  textZones?: { left: [number, number]; right: [number, number] };
  className?: string;
}

// Helper: convert value → percent
function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100;
}

// Helper: convert clientX → value
function clientXToValue(
  clientX: number,
  rect: DOMRect,
  min: number,
  max: number,
) {
  const x = clientX - rect.left;
  const ratio = x / rect.width;
  const clamped = Math.max(0, Math.min(1, ratio));
  return Math.round(clamped * (max - min) + min);
}

export function BlockSlider({
  value: controllerValue,
  defaultValue = 50,
  min = 0,
  max = 100,
  label = "Value",
  onChange,
  textZones,
  className,
}: BlockSliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const valueRef = useRef<HTMLSpanElement | null>(null);

  const [calculatedZones, setCalculatedZones] = useState<{
    left: [number, number];
    right: [number, number];
  } | null>(null);

  const value = controllerValue !== undefined ? controllerValue : internalValue;

  const percent = useMemo(
    () => valueToPercent(value, min, max),
    [value, min, max],
  );

  const updateValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const newValue = clientXToValue(clientX, rect, min, max);

      if (controllerValue === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    },
    [min, max, controllerValue, onChange],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateValue(e.clientX);
  };

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!isDragging) return;
      updateValue(e.clientX);
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [isDragging, updateValue]);

  useEffect(() => {
    if (textZones) {
      return;
    }

    if (!trackRef.current || !labelRef.current || !valueRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const labelRect = labelRef.current.getBoundingClientRect();
    const valueRect = valueRef.current.getBoundingClientRect();

    const toPercent = (px: number) =>
      ((px - trackRect.left) / trackRect.width) * 100;

    const leftZone: [number, number] = [
      toPercent(labelRect.left + 14),
      toPercent(labelRect.right + 14),
    ];

    const rightZone: [number, number] = [
      toPercent(valueRect.left + 14),
      toPercent(valueRect.right + 14),
    ];

    console.log({ leftZone, rightZone });

    setCalculatedZones({ left: leftZone, right: rightZone });
  }, [label, textZones]);

  const activeOverlapZones = textZones ??
    calculatedZones ?? { left: [0, 0], right: [100, 100] };

  const isBehindText =
    (percent >= activeOverlapZones.left[0] &&
      percent <= activeOverlapZones.left[1]) ||
    (percent >= activeOverlapZones.right[0] &&
      percent <= activeOverlapZones.right[1]);

  const baseHeight = isDragging ? 30 : 24;
  const finalHeight = isBehindText ? 18 : baseHeight;
  const finalOpacity = isBehindText ? 0.4 : 1;

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      className={`relative h-12 rounded-[90px] bg-[hsl(0,0%,94%)] dark:bg-[hsl(0,0%,16%)] overflow-hidden select-none squircle ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${className ?? ""} touch-none`}
    >
      {/* Label layer */}
      <div className="absolute inset-0 flex justify-between items-center px-6 pointer-events-none z-10">
        <span
          ref={labelRef}
          className="text-[hsl(0,0%,37%)] dark:text-[hsl(0,0%,96%)] font-medium text-base"
        >
          {label}
        </span>
        <span
          ref={valueRef}
          className="text-[hsl(0,0%,38%)] dark:text-[hsl(0,0%,62%)] font-semibold text-xl tabular-nums"
        >
          {value}
        </span>
      </div>

      {/* Filled indicator */}
      <motion.div
        className={`absolute inset-y-0 left-0 rounded-[120px] squircle ${
          isDragging
            ? "bg-[hsl(0,0%,81%)] dark:bg-[hsl(0,0%,28%)]"
            : "bg-[hsl(0,0%,86%)] dark:bg-[hsl(0,0%,24%)]"
        } transition-colors`}
        initial={false}
        animate={{
          width: `${percent}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
        }}
      >
        <motion.div
          className="absolute right-3 top-1/2 -translate-y-1/2 w-1 bg-[hsl(0,0%,58%)] dark:bg-[hsl(0,0%,35%)] rounded-full"
          initial={false}
          animate={{
            height: finalHeight,
            opacity: finalOpacity,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </motion.div>
    </div>
  );
}
