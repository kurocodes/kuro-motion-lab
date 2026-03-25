import ReactLenis from "lenis/react";
import { ScrollVelocityMarquee } from "../core/ScrollVelocityMarquee";

export default function ScrollVelocityMarqueeDemo() {
  return (
    <ReactLenis root>
      <div className="svm-container">
        <ScrollVelocityMarquee baseVelocity={-200}>Kuro</ScrollVelocityMarquee>
        <ScrollVelocityMarquee baseVelocity={200}>
          Scroll Velocity Marquee
        </ScrollVelocityMarquee>
      </div>
    </ReactLenis>
  );
}
