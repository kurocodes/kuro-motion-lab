import type { Transition } from "motion";

export interface GlideTipItem {
  id: string;
  label: React.ReactNode;
  trigger?: React.ReactNode;
}

export interface TooltipTransition {
  tooltip?: {
    x?: Transition;
    width?: Transition;
    opacity?: Transition;
  };
  content?: Transition;
}

export type Direction = "top" | "bottom";
export type Alignment = "center" | "smart";