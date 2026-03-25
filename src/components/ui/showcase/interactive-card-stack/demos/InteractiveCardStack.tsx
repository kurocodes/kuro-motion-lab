import CardStack from "../core/CardStack";
import { images } from "./data";

export default function InteractiveCardStack() {
  return (
    <div className=" flex justify-center items-center">
      <CardStack items={images}>
        {(card) => (
          <img
            src={card.img}
            alt={`Card ${card.id}`}
            className="pointer-events-none h-full w-full rounded-xl object-cover"
          />
        )}
      </CardStack>
    </div>
  );
}