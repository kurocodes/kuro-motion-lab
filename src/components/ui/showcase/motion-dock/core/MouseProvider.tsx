import { useMotionValue, useVelocity } from "motion/react";
import { useEffect, useMemo } from "react";
import { MouseContext } from "./MouseContext";


export const MouseProvider = ({ children }: { children: React.ReactNode }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        }

        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, [x, y]);

    // MotionValue velocity (how fast the mouse moves) - useful for dynamic effects (later)
    const velocityX = useVelocity(x);
    const velocityY = useVelocity(y);

    const value = useMemo(() => ({
        position: {
            x, y
        },
        velocity: {
            x: velocityX, y: velocityY
        }
    }), [x, y, velocityX, velocityY]);

    return (
        <MouseContext.Provider value={value}>{children}</MouseContext.Provider>
    )
}