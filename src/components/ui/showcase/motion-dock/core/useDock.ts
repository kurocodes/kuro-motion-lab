import { useContext } from "react";
import { DockContext } from "./DockContext";

export const useDock = () => {
  const ctx = useContext(DockContext);
  if (!ctx) throw new Error("useDock must be used within a DockProvider");
  return ctx;
};