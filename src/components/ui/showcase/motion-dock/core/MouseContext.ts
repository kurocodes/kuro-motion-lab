import { createContext } from "react";
import type { MouseContextValue } from "./types";

export const MouseContext = createContext<MouseContextValue | null>(null);