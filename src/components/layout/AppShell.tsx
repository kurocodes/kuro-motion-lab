import type { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text) transition-colors duration-300">
      <div className="absolute inset-x-0 top-0 -z-10 h-112 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.06),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_45%)]" />
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
