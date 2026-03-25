import { Dock, DockItem, GradientCard, MouseProvider } from "../core";

export default function MotionDockDemo() {
  return (
    <div className="relative min-h-100 bg-[hsl(0,0%,89%)] dark:bg-[hsl(0,0%,11%)]">
      <MouseProvider>
        <Dock>
          <DockItem>
            <GradientCard src="https://products.ls.graphics/mesh-gradients/images/33.-Beauty-Bush.jpg" />
          </DockItem>
          <DockItem>
            <GradientCard src="https://products.ls.graphics/mesh-gradients/images/32.-Banana-Mania.jpg" />
          </DockItem>
          <DockItem>
            <GradientCard src="https://products.ls.graphics/mesh-gradients/images/01.-Royal-Heath.jpg" />
          </DockItem>
          <DockItem>
            <GradientCard src="https://products.ls.graphics/mesh-gradients/images/29.-Pale-Cornflower-Blue_1.jpg" />
          </DockItem>
          <DockItem>
            <GradientCard src="https://products.ls.graphics/mesh-gradients/images/05.-Flax.jpg" />
          </DockItem>
          <DockItem>
            <GradientCard src="https://products.ls.graphics/mesh-gradients/images/07.-Tidal.jpg" />
          </DockItem>
          <DockItem>
            <GradientCard src="https://products.ls.graphics/mesh-gradients/images/23.-California_1.jpg" />
          </DockItem>
        </Dock>
      </MouseProvider>
    </div>
  );
}
