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
    setDices(handleNumsRandom());
  }

  return (
    <main className="bg-gray-600">
      <div className="flex flex-col justify-center items-center gap-5 py-10 min-h-svh container mx-auto">
        <h1 className="text-3xl font-bold">Tenzies</h1>

        <div className="grid grid-cols-5 gap-5 justify-center">
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

        <button
          className="px-4 py-2 mt-3 rounded-2xl border-2 border-black text-xl font-bold text-white bg-black cursor-pointer hover:bg-transparent hover:text-black duration-300"
          onClick={handleNewDices}
        >
          Girar os Dados
        </button>
      </div>
    </main>
  );
}
