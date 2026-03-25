import type { MotionValue } from "motion";

export interface DockContextValue {
    width: number;
    left: number;
    hovered: boolean;
}

export interface DockProps {
    children: React.ReactNode;
    className?: string;
    spacing?: number;
    padding?: number;
}

export interface DockItemProps {
    children: React.ReactNode;
    baseSize?: number;
    maxSize?: number;
    lift?: number;
    fallOf?: number;
    className?: string;
}

export type MouseContextValue = {
    position: {
        x: MotionValue<number>;
        y: MotionValue<number>;
    };
    velocity: {
        x: MotionValue<number>;
        y: MotionValue<number>;
    };
}