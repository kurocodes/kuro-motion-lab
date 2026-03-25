import type React from "react";
import type { GlideTipItem } from "./types";
import { useEffect, useRef } from "react";

interface TooltipTriggersProps {
  items: GlideTipItem[];
  controlsRef: React.RefObject<(HTMLDivElement | null)[]>;
  active: number | null;
  setActive: React.Dispatch<React.SetStateAction<number | null>>;
  setLastActive: React.Dispatch<React.SetStateAction<number>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  delay: number;
  renderTrigger?: (
    item: GlideTipItem,
    index: number,
    isActive: boolean,
  ) => React.ReactNode;
  triggersClassName: string;
}

export default function TooltipTriggers({
  items,
  controlsRef,
  active,
  setActive,
  setLastActive,
  setIsVisible,
  delay,
  renderTrigger,
  triggersClassName,
}: TooltipTriggersProps) {
  const hoverTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  return (
    <div
      className={`relative flex ${triggersClassName}`}
      onPointerEnter={() => {
        if (hoverTimeout.current) {
          clearTimeout(hoverTimeout.current);
        }

        hoverTimeout.current = window.setTimeout(() => {
          setIsVisible(true);
        }, delay);
      }}
      onPointerLeave={() => {
        if (hoverTimeout.current) {
          clearTimeout(hoverTimeout.current);
        }

        setActive(null);
        hoverTimeout.current = window.setTimeout(() => {
          setIsVisible(false);
        }, delay);
      }}
    >
      {items.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => {
            controlsRef.current[i] = el;
          }}
          onPointerEnter={() => {
            setActive(i);
            setLastActive(i);
          }}
          onFocus={() => {
            setActive(i);
            setLastActive(i);
            setIsVisible(true);
          }}
          onBlur={() => {
            setActive(null);
            setIsVisible(false);
          }}
        >
          {renderTrigger ? (
            renderTrigger(item, i, i === active)
          ) : item.trigger ? (
            item.trigger
          ) : (
            <DefaultTrigger />
          )}
        </div>
      ))}
    </div>
  );
}

function DefaultTrigger() {
  return (
    <button
      type="button"
      className="flex size-12 cursor-pointer items-center justify-center"
    >
      <div className="h-1 w-[80%] rounded-full bg-neutral-600 transition-colors duration-300 hover:bg-neutral-200" />
    </button>
  );
}
