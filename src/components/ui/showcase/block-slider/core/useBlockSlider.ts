import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseBlockSliderProps {
  value?: number;
  defaultValue?: number;
  min: number;
  max: number;
  step: number;
  onChange?: (value: number) => void;
}

export function useBlockSlider({
  value: controlledValue,
  defaultValue = 50,
  min,
  max,
  step,
  onChange,
}: UseBlockSliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const percent = useMemo(
    () => ((value - min) / (max - min)) * 100,
    [value, min, max],
  );

  const updateValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();

      const x = clientX - rect.left;
      const ratio = x / rect.width;
      const clamped = Math.max(0, Math.min(1, ratio));

      const rawValue = clamped * (max - min) + min;

      const stepped = step > 0 ? Math.round(rawValue / step) * step : rawValue;

      const finalValue = Math.min(max, Math.max(min, stepped));

      if (controlledValue === undefined) {
        setInternalValue(finalValue);
      }

      onChange?.(finalValue);
    },
    [min, max, step, controlledValue, onChange],
  );

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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateValue(e.clientX);
  };

  return {
    value,
    percent,
    isDragging,
    trackRef,
    handlePointerDown,
  };
}
