import type { PropsWithChildren } from "react";

type ComponentSandboxProps = PropsWithChildren<{
  compact?: boolean;
}>;

export function ComponentSandbox({
  children,
  compact = false,
}: ComponentSandboxProps) {
  return (
    <div
      className={`component-sandbox overflow-hidden rounded-4xl border border-(--color-border) 
        bg-(--color-preview) shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_12px_40px_rgba(15,23,42,0.06)] 
        dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_12px_40px_rgba(0,0,0,0.24)] 
        ${compact ? "p-6 sm:p-8" : "p-8 sm:p-10"}`}
    >
      {children}
    </div>
  );
}
