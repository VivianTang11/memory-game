import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./Components/Button";
import SingleCard from "./Components/SingleCard";
import Modal from "./Components/Modal";

const cardImages = [
  { src: "./img/pokemon1.png", matched: false },
  { src: "./img/pokemon2.png", matched: false },
  { src: "./img/pokemon3.png", matched: false },
  { src: "./img/pokemon4.png", matched: false },
  { src: "./img/pokemon5.png", matched: false },
  { src: "./img/pokemon6.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [pairs, setPairs] = useState(0);
  const [counter, setCounter] = useState(1000);

  //shuffle card - dubble amount of cards from cardImages
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setPairs(0);
    setCounter(1000);
  };

  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setPairs(pairs + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, pairs]);

  //reset & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <>
      <header>
        <h1>Poke Match</h1>
        <h4>Memory game</h4>
      </header>

      <main>
        <div className="game">
          <div className="data">
            <p>Turns: {turns}</p>
            <p>Counter: {counter}</p>
            <p>
              Pairs: {pairs}/{cardImages.length}
            </p>
          </div>
          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>
          <Button onClick={shuffleCards} className="reset-btn">
            Reset
          </Button>
        </div>
      </main>
      {pairs === cardImages.length ? (
        <Modal shuffleCards={shuffleCards}>Congratulations!</Modal>
      ) : (
        ""
      )}
      {counter === 0 ? (
        <Modal shuffleCards={shuffleCards}>Time is up!</Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
