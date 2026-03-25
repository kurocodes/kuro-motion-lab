import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import TooltipTriggers from "./TooltipTriggers";
import TooltipBubble from "./TooltipBubble";
import type { Alignment, Direction, GlideTipItem, TooltipTransition } from "./types";
import { useTooltipMeasurement } from "./useTooltipMeasurement";
import { useTooltipController } from "./useTooltipController";

interface GlideTipProps {
  items: GlideTipItem[];
  delay?: number;
  direction?: Direction;
  align?: Alignment;
  transition?: TooltipTransition;
  containerClassName?: string;
  tooltipClassName?: string;
  triggersClassName?: string;
  renderLabel?: (
    item: GlideTipItem,
    index: number,
    isActive: boolean,
  ) => React.ReactNode;
  renderTrigger?: (
    item: GlideTipItem,
    index: number,
    isActive: boolean,
  ) => React.ReactNode;
}

export function GlideTip({
  items,
  delay = 120,
  direction = "top",
  align = "center",
  transition,
  containerClassName = "",
  tooltipClassName = "",
  triggersClassName = "",
  renderLabel,
  renderTrigger,
}: GlideTipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { widths, measure: measureLabelWidths } = useTooltipMeasurement(
    items,
    labelRefs,
  );

  const {
    active,
    setActive,
    setLastActive,
    activeIndex,
    tooltipX,
    offset,
    updatePosition: updateTooltipPosition,
  } = useTooltipController(items, widths, align, controlsRef, containerRef);

  useLayoutEffect(() => {
    controlsRef.current = controlsRef.current.slice(0, items.length);
    labelRefs.current = labelRefs.current.slice(0, items.length);

    measureLabelWidths();
  }, [items, measureLabelWidths]);

  useEffect(() => {
    const onResize = () => {
      measureLabelWidths();
      updateTooltipPosition();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [measureLabelWidths, updateTooltipPosition]);

  const tooltipTransition = {
    x: transition?.tooltip?.x ?? {
      type: "spring",
      stiffness: 400,
      damping: 35,
    },
    width: transition?.tooltip?.width ?? {
      type: "spring",
      stiffness: 400,
      damping: 35,
    },
    opacity: transition?.tooltip?.opacity ?? { duration: 0.15 },
  };
  const contentTransition = transition?.content ?? {
    type: "spring",
    stiffness: 400,
    damping: 35,
    mass: 0.6,
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center ${containerClassName}`}
    >
      <TooltipBubble
        isVisible={isVisible}
        tooltipX={tooltipX}
        width={widths[activeIndex] ?? 0}
        offset={offset}
        direction={direction}
        tooltipClassName={tooltipClassName}
        tooltipTransition={tooltipTransition}
        contentTransition={contentTransition}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            style={{ width: widths[i] }}
            className="flex min-h-8 items-center justify-center gap-2 whitespace-nowrap px-2 py-1.5 text-sm leading-0"
          >
            {renderLabel ? renderLabel(item, i, i === activeIndex) : item.label}
          </div>
        ))}
      </TooltipBubble>

      <TooltipTriggers
        items={items}
        controlsRef={controlsRef}
        active={active}
        setActive={setActive}
        setLastActive={setLastActive}
        setIsVisible={setIsVisible}
        delay={delay}
        renderTrigger={renderTrigger}
        triggersClassName={triggersClassName}
      />
    </div>
  );
}
