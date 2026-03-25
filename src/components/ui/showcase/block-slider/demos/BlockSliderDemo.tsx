import { useState } from "react";
import { BlockSlider } from "../core";

export default function BlockSliderDemo() {
  const [value, setValue] = useState(50);

  return (
    <div className="min-h-30 flex items-center justify-center">
      <div className="w-75">
        <BlockSlider
          value={value}
          onChange={setValue}
          label="Value"
          textZones={{ left: [12, 26], right: [88, 97] }}
        />
      </div>
    </div>
  );
}
