import React from "react";
import Button from "./Button";

export default function Modal({
  shuffleCards,
  children,
  turns,
  counter,
  pairs,
  cardImages,
}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{children}</h2>
        {turns !== undefined && <p>Turns: {turns}</p>}
        {pairs !== undefined && <p>Pairs: {pairs}/{cardImages.length}</p>}
        <Button onClick={shuffleCards} className="playagain-btn">
          Play again
        </Button>
      </div>
    </div>
  );
}
