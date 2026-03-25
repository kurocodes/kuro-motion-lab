import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

export type ComponentMeta = {
  slug: string;
  name: string;
  description: string;
  preview: string;
  tags: string[];
  githubUrl?: string;
  supportsTouch?: boolean;
  component: LazyExoticComponent<ComponentType>;
};

export const componentsData: ComponentMeta[] = [
  {
    slug: "stacklet-notifications",
    name: "Stacklet Notifications",
    description: `A smooth, stacked notification system powered by a reusable layout engine.
Cards collapse into a layered stack and expand fluidly on interaction, creating a sense of depth and motion without overwhelming the UI.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Animation", "Stack", "Hover", "UI", "Motion"],
    githubUrl: "https://github.com/kurocodes/Stacklet",
    component: lazy(
      () =>
        import("../components/ui/showcase/stacklet/demos/StackletNotifications"),
    ),
  },
  {
    slug: "stacklet-avatar-stack",
    name: "Stacklet Avatar Stack",
    description: `A compact avatar stack that expands into a fully visible list with soft, layered animations.
Perfect for representing users, teams, or participants with a clean and interactive presentation.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Avatar", "Stack", "Hover", "UI", "Motion"],
    githubUrl: "https://github.com/kurocodes/Stacklet",
    component: lazy(
      () =>
        import("../components/ui/showcase/stacklet/demos/StackletAvatarStack"),
    ),
  },
  {
    slug: "morph-menu",
    name: "Morph Menu",
    description: `A fluid, morphing menu that transforms seamlessly from a button into a contextual panel.
Adapts direction and alignment dynamically, creating a polished, tactile interaction that feels alive.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Menu", "Animation", "Motion", "Interaction", "UI"],
    githubUrl: "https://github.com/kurocodes/Morph-Menu",
    component: lazy(
      () => import("../components/ui/showcase/morph-menu/demos/MorphMenu"),
    ),
  },
  {
    slug: "interactive-card-stack",
    name: "Interactive Card Stack",
    description: `A tactile card stack with smooth 3D drag interactions and physics-based motion.
Cards tilt, move, and reorder naturally, creating a satisfying, real-world feel in a fully reusable system.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "3D", "Drag", "Animation", "Motion", "Interaction"],
    githubUrl: "https://github.com/kurocodes/interactive-card-stack",
    component: lazy(
      () =>
        import("../components/ui/showcase/interactive-card-stack/demos/InteractiveCardStack"),
    ),
  },
  {
    slug: "interactive-cursor",
    name: "Interactive Cursor",
    description: `A smooth, animated cursor that follows movement with spring-based physics and subtle hover interactions.
Supports magnetic effects and customizable styling, turning the pointer into an interactive part of the UI.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Cursor", "Animation", "Hover", "Motion", "Interaction"],
    githubUrl: "https://github.com/kurocodes/Interactive-Cursor-Effect",
    supportsTouch: false,
    component: lazy(
      () =>
        import("../components/ui/showcase/interactive-cursor/demo/InteractiveCursor"),
    ),
  },
  {
    slug: "scroll-focus-list",
    name: "Scroll Focus List",
    description: `A scroll-driven list where items smoothly scale, fade, and shift into focus as they reach the center of the viewport.
Creates a calm, premium browsing experience that naturally guides user attention.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Scroll", "Animation", "Motion", "UI", "Lenis"],
    githubUrl: "https://github.com/kurocodes/Scroll-Focus-List",
    component: lazy(
      () =>
        import("../components/ui/showcase/scroll-focus-list/ScrollFocusList"),
    ),
  },
  {
    slug: "block-slider",
    name: "Block Slider",
    description: `A tactile slider with smooth, spring-based motion and intelligent handle behavior.
The handle dynamically adapts around text, creating a polished interaction that feels precise and responsive.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Slider", "Drag", "Interaction", "Motion", "UI"],
    component: lazy(
      () =>
        import("../components/ui/showcase/block-slider/demos/BlockSliderDemo"),
    ),
  },
  {
    slug: "glide-tip-toolbar",
    name: "Glide Tip Toolbar",
    description: `A fluid tooltip system that glides seamlessly across toolbar items with shared motion and dynamic alignment.
Instead of appearing abruptly, the tooltip moves as a single entityâ€”creating a smooth, continuous interaction across triggers.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Tooltip", "Hover", "Animation", "Motion", "UI"],
    githubUrl: "https://github.com/kurocodes/Glide-Tip",
    supportsTouch: false,
    component: lazy(
      () => import("../components/ui/showcase/glide-tip/demos/GlideTipToolbar"),
    ),
  },
  {
    slug: "glide-tip-indicator",
    name: "Glide Tip Indicator",
    description: `A minimal, motion-driven tooltip indicator that transitions smoothly between steps or elements.
Designed for guided flows and status indicators, it maintains continuity while adapting position and content dynamically.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Tooltip", "Indicator", "Animation", "Motion", "UI"],
    githubUrl: "https://github.com/kurocodes/Glide-Tip",
    supportsTouch: false,
    component: lazy(
      () =>
        import("../components/ui/showcase/glide-tip/demos/GlideTipIndicator"),
    ),
  },
  {
    slug: "animated-gooey-bar",
    name: "Animated Gooey Bar",
    description: `A macOS-inspired menu bar featuring fluid, gooey dropdown animations and soft micro-interactions.
Built with SVG filters and shared layout motion to create organic, responsive UI transitions.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Menu", "Animation", "SVG", "Motion", "UI"],
    githubUrl: "https://github.com/kurocodes/Animated-Gooey-Bar",
    component: lazy(
      () =>
        import("../components/ui/showcase/animated-gooey-bar/AnimatedGooeyBar"),
    ),
  },
  {
    slug: "scroll-velocity-marquee",
    name: "Scroll Velocity Marquee",
    description: `An infinite marquee that reacts to scroll speed and direction, accelerating and reversing in real time.
Adds energy and motion to sections with a dynamic, scroll-linked animation.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Scroll", "Animation", "Motion", "Marquee", "Lenis"],
    githubUrl: "https://github.com/kurocodes/Scroll-Velocity-Marquee",
    component: lazy(
      () =>
        import("../components/ui/showcase/scroll-velocity-marquee/demos/ScrollVelocityMarqueeDemo"),
    ),
  },
  {
    slug: "motion-dock",
    name: "Motion Dock",
    description: `A proximity-based dock where items scale and lift smoothly based on cursor position.
Inspired by macOS, it uses physics-driven motion and cosine-based scaling for a responsive, playful interaction.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Hover", "Animation", "Motion", "Interaction", "UI"],
    githubUrl: "https://github.com/kurocodes/Motion-Dock",
    supportsTouch: false,
    component: lazy(
      () =>
        import("../components/ui/showcase/motion-dock/demos/MotionDockDemo"),
    ),
  },
  {
    slug: "staggered-text",
    name: "Staggered Text",
    description: `A layered text animation where characters transition in a staggered sequence on hover, creating a smooth vertical reveal effect.
Each letter moves independently, producing a rhythmic, wave-like motion that feels clean, responsive, and expressive.`,
    preview: "/previews/segmented-control.svg",
    tags: ["React", "Text", "Hover", "Animation", "Motion", "UI"],
    supportsTouch: false,
    component: lazy(
      () =>
        import("../components/ui/showcase/staggered-text/StaggeredTextDemo"),
    ),
  },
];

export function getComponentBySlug(slug?: string) {
  return componentsData.find((component) => component.slug === slug);
}
