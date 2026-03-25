import { useEffect, useRef, useState } from "react";
import { MenuContext, type Anchor, type Direction } from "./Context";
import { twMerge } from "tailwind-merge";

type MenuRootProps = {
  direction?: Direction;
  anchor?: Anchor;
  className?: string;
  children: React.ReactNode;
};

export function MenuRoot({
  direction = "top",
  anchor = "start",
  className,
  children,
}: MenuRootProps) {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <MenuContext.Provider value={{ open, setOpen, direction, anchor, menuRef }}>
      <div className={twMerge(className, "relative inline-block")}>
        {children}
      </div>
    </MenuContext.Provider>
  );
}
