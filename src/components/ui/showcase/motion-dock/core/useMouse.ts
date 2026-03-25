import { useContext } from "react";
import { MouseContext } from "./MouseContext";

export const useMouse = () => {
    const ctx = useContext(MouseContext);
    if (!ctx) throw new Error("useMouse must be used within a MouseProvider");
    return ctx;
}