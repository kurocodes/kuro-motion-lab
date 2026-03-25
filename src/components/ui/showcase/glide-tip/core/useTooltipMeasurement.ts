import { useCallback, useState } from "react";
import type { GlideTipItem } from "./types";

export function useTooltipMeasurement(
  items: GlideTipItem[],
  labelRefs: React.RefObject<(HTMLDivElement | null)[]>,
) {
  const [widths, setWidths] = useState<number[]>([]);

  const measure = useCallback(() => {
    const measured = items.map(
      (_, i) => labelRefs.current[i]?.getBoundingClientRect().width ?? 0,
    );
    setWidths(measured);
  }, [items, labelRefs]);

  return { widths, measure };
}
