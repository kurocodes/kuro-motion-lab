import { FaSpotify, FaCloud } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { PiWifiHighBold } from "react-icons/pi";
import { HiBattery100, HiClock } from "react-icons/hi2";
import { useState } from "react";
import MenuItem from "./MenuItem";
import MarqueeText from "./MarqueeText";

export default function AnimatedGooeyBar() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const hovered = hoveredIdx !== null;

  return (
    <div className="bg-black w-full h-15 flex justify-center items-center overflow-x-clip">
      <div className="relative flex items-center h-full">
        <MenuItem
          index={0}
          hoveredIdx={hoveredIdx}
          onHover={setHoveredIdx}
          Icon={FaSpotify}
        >
          <div className="text-xs text-[#a2a2a2] flex items-center">
            <span className="px-2">
              <FaCirclePlay className="text-green-500" />
            </span>
            <span className="bg-[#a2a2a2]/50 w-[0.5px] h-2.5"></span>
            <div className="slot-mask px-4 w-30 whitespace-nowrap overflow-hidden">
              <MarqueeText hovered={hovered} speed={10}>
                <span>
                  <span className="text-green-400">Fleetwood Mac</span> •
                  Dreams&nbsp;&nbsp;&nbsp;
                </span>
              </MarqueeText>
            </div>
          </div>
        </MenuItem>
        <MenuItem
          index={1}
          hoveredIdx={hoveredIdx}
          onHover={setHoveredIdx}
          Icon={FaCloud}
          text="80&deg;F"
        >
          <div className="text-xs text-[#a2a2a2] flex items-center">
            <span className="px-2">
              <FaCloud color="white" />
            </span>
            <span className="bg-[#a2a2a2]/50 w-[0.5px] h-2.5"></span>
            <div className="slot-mask px-4 w-30 whitespace-nowrap overflow-hidden">
              <MarqueeText hovered={hovered} speed={10}>
                <span className="">
                  Cloudy • 80&deg; •{" "}
                  <span className="text-sky-400">San Francisco</span>
                </span>
              </MarqueeText>
            </div>
          </div>
        </MenuItem>
        <MenuItem
          index={2}
          hoveredIdx={hoveredIdx}
          onHover={setHoveredIdx}
          Icon={PiWifiHighBold}
        >
          <div className="text-xs text-[#a2a2a2] flex items-center">
            <span className="px-2 text-cyan-400">Wifi</span>
            <span className="bg-[#a2a2a2]/50 w-[0.5px] h-2.5"></span>
            <span className="px-2">Connected</span>
          </div>
        </MenuItem>
        <MenuItem
          index={3}
          hoveredIdx={hoveredIdx}
          onHover={setHoveredIdx}
          Icon={HiBattery100}
        >
          <div className="text-xs text-[#a2a2a2] flex items-center">
            <span className="px-2 text-green-400">Battery</span>
            <span className="bg-[#a2a2a2]/50 w-[0.5px] h-2.5"></span>
            <span className="px-2">60% Charged</span>
          </div>
        </MenuItem>
        <MenuItem
          index={4}
          hoveredIdx={hoveredIdx}
          onHover={setHoveredIdx}
          Icon={HiClock}
        >
          <div className="text-xs text-[#a2a2a2] flex items-center">
            <span className="px-2 text-orange-400">Sat Jan 3</span>
            <span className="bg-[#a2a2a2]/50 w-[0.5px] h-2.5"></span>
            <span className="px-2">10:35 AM</span>
          </div>
        </MenuItem>

        {/* Debug helper */}
        {/* {hoveredIdx !== null && (
          <span className="absolute -bottom-6 text-xs text-gray-500">
            Hovered: {hoveredIdx}
          </span>
        )} */}
      </div>
    </div>
  );
}
