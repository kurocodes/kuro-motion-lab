import { useState } from "react";
import { Menu } from "../core";
import {
  LuAlignCenterVertical,
  LuAlignEndVertical,
  LuAlignStartVertical,
  LuArchive,
  LuArrowDown,
  LuArrowLeft,
  LuArrowRight,
  LuCopy,
  LuEllipsis,
  LuPencil,
  LuShare,
} from "react-icons/lu";
import type { Anchor, Direction } from "../core";
import type { IconType } from "react-icons";
import { LuArrowUp } from "react-icons/lu";
import { motion } from "motion/react";

const directionControls: { value: Direction; Icon: IconType }[] = [
  { value: "top", Icon: LuArrowUp },
  { value: "bottom", Icon: LuArrowDown },
  { value: "left", Icon: LuArrowLeft },
  { value: "right", Icon: LuArrowRight },
];

const anchorControls: { value: Anchor; Icon: IconType }[] = [
  { value: "start", Icon: LuAlignStartVertical },
  { value: "center", Icon: LuAlignCenterVertical },
  { value: "end", Icon: LuAlignEndVertical },
];

const itemClass =
  "flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100";

export default function App() {
  const [direction, setDirection] = useState<Direction>("top");
  const [anchor, setAnchor] = useState<Anchor>("start");

  function setDirectionSafe(next: Direction) {
    setDirection(next);

    // left/right only support center anchor
    if ((next === "left" || next === "right") && anchor !== "center") {
      setAnchor("center");
    }
  }

  function setAnchorSafe(next: Anchor) {
    // prevent invalid combos
    if ((direction === "left" || direction === "right") && next !== "center") {
      return;
    }
    setAnchor(next);
  }

  return (
    <div className="relative min-h-140 p-10 flex flex-col items-center justify-center bg-[#262626]">
      <div className="flex-1 flex items-center justify-center">
        <Menu.Root direction={direction} anchor={anchor}>
          <Menu.Container
            buttonSize={40}
            menuWidth={160}
            menuRadius={12}
            className="bg-white shadow-lg ring-1 ring-black/5"
          >
            <Menu.Trigger>
              <div className="flex h-10 w-10 items-center justify-center text-black">
                <LuEllipsis />
              </div>
            </Menu.Trigger>

            <Menu.Content className="p-2">
              <Menu.Item className={itemClass} onSelect={() => {}}>
                <LuPencil /> Edit
              </Menu.Item>
              <Menu.Item className={itemClass} onSelect={() => {}}>
                <LuCopy /> Copy
              </Menu.Item>
              <Menu.Item className={itemClass} onSelect={() => {}}>
                <LuShare /> Share
              </Menu.Item>
              <Menu.Item className={itemClass} onSelect={() => {}}>
                <LuArchive /> Archive
              </Menu.Item>
            </Menu.Content>
          </Menu.Container>
        </Menu.Root>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 m-4">
        <ControlsContainer>
          {directionControls.map(({ value, Icon }) => (
            <ControlButton
              key={value}
              Icon={Icon}
              active={direction === value}
              onClick={() => setDirectionSafe(value)}
              tooltip={`Expand ${value}`}
              layoutId="activeDirection"
            />
          ))}
        </ControlsContainer>

        <ControlsContainer>
          {anchorControls.map(({ value, Icon }) => {
            const disabled =
              (direction === "left" || direction === "right") &&
              value !== "center";

            return (
              <ControlButton
                key={value}
                Icon={Icon}
                active={anchor === value}
                disabled={disabled}
                onClick={() => setAnchorSafe(value)}
                tooltip={`Anchor ${value}`}
                layoutId="activeAnchor"
              />
            );
          })}
        </ControlsContainer>
      </div>
    </div>
  );
}

function ControlsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex rounded-full p-1 bg-neutral-700/80">
      {children}
    </div>
  );
}

function ControlButton({
  active = false,
  disabled = false,
  Icon,
  onClick,
  tooltip,
  layoutId,
}: {
  active?: boolean;
  disabled?: boolean;
  Icon: IconType;
  onClick?: () => void;
  tooltip?: string;
  layoutId: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      data-tooltip="Expand up"
      className={`
        relative z-10 h-8 w-8 flex items-center justify-center rounded-full
        transition
        ${disabled ? "opacity-30 cursor-not-allowed" : ""}
      `}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-full shadow-sm bg-neutral-600"
        ></motion.span>
      )}
      <span className="relative z-10 transition-colors duration-200 text-neutral-300 h-4">
        <Icon size={16} />
      </span>
    </button>
  );
}
