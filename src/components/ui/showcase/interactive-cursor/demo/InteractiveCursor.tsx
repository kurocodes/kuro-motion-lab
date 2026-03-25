import { Cursor } from "../core";
import Button from "./Button";

export default function InteractiveCursor() {
  return (
     <div className="cursor-container">
      <Cursor />

      <div>
        <Button />
      </div>
    </div>
  )
}
