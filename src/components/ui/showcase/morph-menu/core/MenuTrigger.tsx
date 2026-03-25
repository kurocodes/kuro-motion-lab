import type React from "react";
import { useMenu } from "./Context";

export function MenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen } = useMenu();

  if (open) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setOpen(o => !o)}
      className="absolute inset-0 flex items-center justify-center cursor-pointer"
    >
        {children}
    </div>
  );
}
