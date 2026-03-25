import Lenis from "lenis";
import { useEffect } from "react";
import { characters } from "./data";
import ListItem from "./ListItem";
import "./index.css";

export default function ScrollFocusList() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="scroll-list-container">
      <section className="px-30 max-sm:px-10 spacing" />
      <section className="px-30 max-sm:px-10 listing">
        <ul>
          {characters.map((character) => (
            <ListItem key={character.name} item={character} />
          ))}
        </ul>
      </section>
      <section className="px-30 max-sm:px-10 spacing" />
    </div>
  );
}
