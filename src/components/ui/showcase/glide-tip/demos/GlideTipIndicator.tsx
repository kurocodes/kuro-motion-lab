import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function GlideTipIndicator() {
  const labels = [
    "Personal Information",
    "Contact Details",
    "Project Information",
  ];

  const [widths, setWidths] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const [tooltipX, setTooltipX] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const hoverTimeout = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const measured = labelRefs.current.map(
      (el) => el?.getBoundingClientRect().width ?? 0,
    );
    setWidths(measured);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !controlsRef.current[active]) return;

    const control = controlsRef.current[active]!;
    const container = containerRef.current;

    const controlRect = control.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const center =
      controlRect.left - containerRect.left + controlRect.width / 2;

    const currentWidth = widths[active] ?? 0;

    setTooltipX(center - currentWidth / 2);
  }, [active, widths]);

  const offset = widths.slice(0, active).reduce((acc, w) => acc + w, 0);

  return (
    <div className="min-h-90 flex items-center justify-center bg-[hsl(0,0%,95%)] dark:bg-[hsl(0,0%,15%)]">
      <div
        ref={containerRef}
        className="h-32 relative flex flex-col items-center justify-center "
      >
        {/* Tooltip */}
        <motion.div
          initial={false}
          animate={{
            x: tooltipX,
            width: widths[active] ?? 0,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            x: { type: "spring", stiffness: 400, damping: 35 },
            width: { type: "spring", stiffness: 400, damping: 35 },
            opacity: { duration: 0.15 },
          }}
          className="absolute -top-6 z-50 rounded-md font-medium overflow-hidden bg-[hsl(0,0%,90%)] dark:bg-[hsl(0,0%,20%)] text-[hsl(0,0%,10%)] dark:text-[hsl(0,0%,70%)]"
        >
          <motion.div
            animate={{
              x: -offset,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
              mass: 0.6,
            }}
            className="flex"
          >
            {labels.map((label, i) => (
              <div
                key={i}
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                style={{ width: widths[i] }}
                className="p-2 text-sm whitespace-nowrap flex justify-center"
              >
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Controls */}
        <div
          className="relative flex"
          onPointerEnter={() => {
            if (hoverTimeout.current) {
              clearTimeout(hoverTimeout.current);
            }

            hoverTimeout.current = window.setTimeout(() => {
              setIsVisible(true);
            }, 120);
          }}
          onPointerLeave={() => {
            if (hoverTimeout.current) {
              clearTimeout(hoverTimeout.current);
            }

            hoverTimeout.current = window.setTimeout(() => {
              setIsVisible(false);
            }, 120);
          }}
        >
          {labels.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                controlsRef.current[i] = el;
              }}
              onPointerEnter={() => setActive(i)}
              className="size-12 group flex items-center justify-center group cursor-pointer"
            >
              <div className="h-1 w-[80%] rounded-full transition-colors duration-300 bg-[hsl(0,0%,60%)] dark:bg-[hsl(0,0%,40%)] group-hover:bg-[hsl(0,0%,40%)] group-hover:dark:bg-[hsl(0,0%,60%)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
