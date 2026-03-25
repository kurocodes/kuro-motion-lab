import { motion } from "motion/react";

type IconProps = {
  Icon: React.ElementType;
  index: number;
  hoveredIdx: number | null;
  onHover: (index: number | null) => void;
  size?: number;
  text?: string;
  children?: React.ReactNode;
};

export default function MenuItem({
  Icon,
  index,
  hoveredIdx,
  onHover,
  size = 20,
  text,
  children,
}: IconProps) {
  return (
    <div
      className="relative h-full px-4 flex gap-2 items-center text-[#a2a2a2] hover:text-white transition-colors duration-300 cursor-default"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <Icon size={size} />
      {text && <span className="text-sm font-medium">{text}</span>}

      {hoveredIdx === index && (
        <motion.div
          layoutId="gooey"
          className="absolute -bottom-10 left-1/2 -translate-x-1/2"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        >
          {/* SVG SHAPE */}
          <svg
            width="240"
            height="60"
            viewBox="0 0 240 60"
            className="overflow-hidden"
          >
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 40 -10
                  "
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>

            <g filter="url(#goo)">
              {/* Main body */}
              <rect
                x="20"
                y="18"
                width="200"
                height="24"
                rx="50"
                fill="black"
              />

              {/* Top droplet */}
              <rect
                x="25"
                y="-5"
                width="240"
                height="20"
                rx="50"
                fill="black"
              />
              <rect
                x="-25"
                y="-5"
                width="240"
                height="20"
                rx="50"
                fill="black"
              />
            </g>
          </svg>

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center justify-center text-white">
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
}
