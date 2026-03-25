import type React from "react";
import { createContext, useContext } from "react";

export type Direction = "top" | "bottom" | "left" | "right";
export type Anchor = "start" | "center" | "end";

type MenuContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  direction: Direction;
  anchor: Anchor;
  menuRef: React.RefObject<HTMLDivElement | null>;
};

export const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("Menu components must be used inside Menu.Root");
  return ctx;
}
