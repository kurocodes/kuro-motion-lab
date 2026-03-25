import { useEffect, useState, type ReactNode } from "react";
import type { StackableItem } from "./types";
import DraggableCard from "./DraggableCard";
import { motion } from "motion/react";

interface StackConfig {
  rotation: number;
  scale: number;
  perspective: number;
}

interface CardStackProps<T extends StackableItem> {
  items: T[];
  children: (item: T) => ReactNode;
  containerClassName?: string;
  cardClassName?: string;
  stackConfig?: Partial<StackConfig>;
}

const defaultConfig: StackConfig = {
  rotation: 4,
  scale: 0.06,
  perspective: 600,
};

export default function CardStack<T extends StackableItem>({
  items: initialItems,
  children,
  containerClassName = "relative h-52 w-52",
  cardClassName = "absolute h-52 w-52",
  stackConfig: userConfig = {},
}: CardStackProps<T>) {
  const [items, setItems] = useState(initialItems);
  const config = { ...defaultConfig, ...userConfig };

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const sendItemToBack = (id: T["id"]) => {
    setItems((prev) => {
      const newItems = [...prev];
      const index = newItems.findIndex((item) => item.id === id);
      const [item] = newItems.splice(index, 1);
      newItems.unshift(item);
      return newItems;
    });
  };

  return (
    <div
      className={containerClassName}
      style={{ perspective: config.perspective }}
    >
      {items.map((item, index) => (
        <DraggableCard
          key={item.id}
          onSendToBack={() => sendItemToBack(item.id)}
          className={cardClassName}
        >
          <motion.div
            className="h-full w-full"
            animate={{
              rotateZ: (items.length - index - 1) * config.rotation,
              scale: 1 - (items.length - index - 1) * config.scale,
              transformOrigin: "90% 90%",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {children(item)}
          </motion.div>
        </DraggableCard>
      ))}
    </div>
  );
}
