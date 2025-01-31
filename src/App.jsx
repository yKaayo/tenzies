import { useState } from "react";
import generateUniqueId from "generate-unique-id";

import DiceOne from "./components/DiceOne";
import DiceTwo from "./components/DiceTwo";
import DiceThree from "./components/DiceThree";
import DiceFour from "./components/DiceFour";
import DiceFive from "./components/DiceFive";
import DiceSix from "./components/DiceSix";

export default function App() {
  const [dices, setDices] = useState(handleNumsRandom());

  function handleNumsRandom() {
    return new Array(10).fill(0).map(() => ({
      indexDice: Math.floor(Math.random() * 6),
      isHeld: false,
      id: generateUniqueId(),
    }));
  }

  const DICES = [
    <DiceOne key={1} />,
    <DiceTwo key={2} />,
    <DiceThree key={3} />,
    <DiceFour key={4} />,
    <DiceFive key={5} />,
    <DiceSix key={6} />,
  ];

  function handleNewDices() {
    setDices((prevDices) =>
      prevDices.map((dice) =>
        dice.isHeld
          ? dice
          : { ...dice, indexDice: Math.floor(Math.random() * 6) }
      )
    );
  }

  return (
    <main className="bg-gray-600">
      <div className="flex flex-col justify-center items-center gap-5 px-5 py-10 min-h-svh container mx-auto text-white">
        <h1 className="text-3xl font-bold">Tenzies</h1>

        <h2 className="text-xl text-balance text-center">Escolha um dado e clique em todos que possuem o mesmo número</h2>

        {dices.every((dice) => dice.isHeld) &&
          dices.every((dice) => dice.indexDice === dices[0].indexDice) && (
            <p className="font-semibold text-2xl text-balance text-center bg-green-500 text-black rounded-2xl px-5 py-2 shadow-2xl border-2 border-black my-5">Parabéns! Você ganhou</p>
          )}

        {dices.every((dice) => dice.isHeld) &&
          !dices.every((dice) => dice.indexDice === dices[0].indexDice) && (
            <p className="font-semibold text-2xl text-balance text-center bg-yellow-300 text-black rounded-2xl px-5 py-2 shadow-2xl border-2 border-black my-5">Tem alguns dados diferente dos outros!</p>
          )}

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 justify-center">
          {dices.map((num) => (
            <button
              className={`dice cursor-pointer duration-150 hover:scale-105 hover:shadow-2xl ${
                num.isHeld ? "bg-green-500" : "bg-white"
              }`}
              onClick={() =>
                setDices((prevDices) =>
                  prevDices.map((prevDice) =>
                    num.id === prevDice.id
                      ? { ...prevDice, isHeld: !prevDice.isHeld }
                      : prevDice
                  )
                )
              }
              key={num.id}
            >
              {DICES[num.indexDice]}
            </button>
          ))}
        </div>

        {dices.every((dice) => dice.isHeld) &&
        dices.every((dice) => dice.indexDice === dices[0].indexDice) ? (
          <button className="btn" onClick={() => setDices(handleNumsRandom())}>
            Recomeçar
          </button>
        ) : (
          <button className="btn" onClick={handleNewDices}>
            Girar os Dados
          </button>
        )}
      </div>
    </main>
  );
}
