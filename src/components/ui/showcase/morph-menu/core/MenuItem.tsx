import type React from "react";
import { twMerge } from "tailwind-merge";

export function MenuItem({
  className,
  onSelect,
  children,
}: {
  className?: string;
  onSelect?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      role="menuitem"
      onClick={onSelect}
      className={twMerge(
        "flex items-center gap-2 rounded-lg px-2 py-2 text-sm cursor-pointer hover:bg-neutral-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
