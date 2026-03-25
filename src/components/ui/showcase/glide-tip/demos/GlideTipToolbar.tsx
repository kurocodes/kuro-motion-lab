import {
  LuCommand,
  LuEye,
  LuMenu,
  LuMessageCircle,
  LuSend,
  LuSparkles,
} from "react-icons/lu";
import { GlideTip, type GlideTipItem } from "../core";

const toolbarItems: GlideTipItem[] = [
  {
    id: "comment",
    label: (
      <>
        <span>Comment</span>
        <span className="font-extralight">C</span>
      </>
    ),
    trigger: <LuMessageCircle className="size-4.5" />,
  },
  {
    id: "enhance",
    label: (
      <>
        <span>Enhance</span>
      </>
    ),
    trigger: <LuSparkles className="size-4.5" />,
  },
  {
    id: "preview",
    label: (
      <>
        <span>Preview</span>
      </>
    ),
    trigger: <LuEye className="size-4.5" />,
  },
  {
    id: "send",
    label: (
      <>
        <span>Send</span>
      </>
    ),
    trigger: <LuSend className="size-4.5" />,
  },
  {
    id: "menu",
    label: (
      <>
        <span>Menu</span>
        <LuCommand className="size-3" />
        <span className="font-extralight">K</span>
      </>
    ),
    trigger: <LuMenu className="size-4.5" />,
  },
];

export default function ToolbarWithTooltip() {
  return (
    <div className="min-h-50 flex items-center justify-center bg-[hsl(0,0%,95%)] dark:bg-[hsl(0,0%,15%)]">
      <GlideTip
        items={toolbarItems}
        delay={100}
        direction="top"
        align="smart"
        triggersClassName="rounded-full border border-black/20 dark:border-white/20 bg-[hsl(0,0%,90%)] dark:bg-[hsl(0,0%,20%)] p-1 shadow-sm"
        tooltipClassName="bg-[hsl(0,0%,84%)] dark:bg-[hsl(0,0%,24%)] text-[hsl(0,0%,40%)] dark:text-[hsl(0,0%,60%)] border-black/10 dark:border-white/10"
        renderTrigger={(item, _index, isActive) => (
          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-full text-[hsl(0,0%,9%)] dark:text-[hsl(0,0%,91%)] transition-all duration-200 ${
              isActive
                ? "bg-[hsl(0,0%,78%)] dark:bg-[hsl(0,0%,28%)]"
                : "bg-transparent"
            } hover:cursor-pointer`}
          >
            {item.trigger}
          </button>
        )}
        renderLabel={(item) => (
          <div className="flex items-center gap-2">{item.label}</div>
        )}
      />
    </div>
  );
}
