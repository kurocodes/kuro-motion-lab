import { motion } from "motion/react";
import useScrollAnimation from "./useScrollAnimation";

interface ListItemProps {
    name: string;
    image: string
}

export default function ListItem({ item }: { item: ListItemProps }) {

    const { ref, scale, opacity, x } = useScrollAnimation();

  return (
    <li ref={ref}>
        <motion.img src={item.image} alt={item.name || ""} style={{ scale }} />
        <motion.p style={{ opacity, x, y: 5 }} className="text-5xl max-sm:text-4xl">{item.name.toUpperCase()}</motion.p>
    </li>
  )
}
