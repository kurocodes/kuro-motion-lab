import { createContext } from "react";
import type { DockContextValue } from "./types";

export const DockContext = createContext<DockContextValue | null>(null);