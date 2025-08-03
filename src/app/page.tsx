"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

function arrToString(arr: number[]) {
  return "[" + arr.join(", ") + "]";
}
function randomInt() {
  const posNeg = Math.sign(Math.random() - 0.5);
  const ranNum = Math.floor(Math.random() * (10 - 0 + 1) + 0) * posNeg;
  return ranNum === 0 ? randomInt() : ranNum;
}

function arraySum(arr: number[]) {
  if (!arr) {
    return;
  }
  if (arr.length === 0) {
    return 0;
  }
  let sum = 0;
  arr.forEach((n) => {
    sum += n;
  });
  return sum;
}

function negCardRed(pp, negCardArr) {
  if (!negCardArr || negCardArr.length === 0 || pp === 0) {
    return [];
  }
  console.log("negCardArr", negCardArr);
  const cardSum = arraySum(negCardArr);
  console.log("pp", pp, "cardSum", cardSum);
  if (pp + cardSum >= 0) {
    return negCardArr;
  } else if (negCardArr.length > 0) {
    return negCardRed(pp, negCardArr.slice(1));
  }
}
function pickCards(cardsArr: number[]) {
  if (cardsArr.length === 0) {
    return;
  }
  const splitCards = [];
  let playerPower = 0;
  const pickedCards = [];
  cardsArr.forEach((c) => {
    const sCL = splitCards.length - 1;
    if (sCL === -1) {
      splitCards.push([c]);
    } else {
      if (
        (splitCards[sCL][0] < 0 && c < 0) ||
        (splitCards[sCL][0] > 0 && c > 0)
      ) {
        splitCards[sCL].push(c);
      } else {
        splitCards.push([c]);
      }
    }
  });

  splitCards.forEach((cA) => {
    if (cA[0] > 0) {
      pickedCards.push(...cA);
      playerPower += arraySum(cA);
    }
    if (cA[0] < 0 && playerPower > 0) {
      console.log("cA in splitcards", cA);
      const reducedNegativeArr = negCardRed(playerPower, cA);
      playerPower += arraySum(reducedNegativeArr);
      pickedCards.push(...reducedNegativeArr);
    }
  });
  const response = {
    pickedCards: pickedCards,
    playerPower: playerPower,
  };
  return response;
}
export default function Home() {
  const [numArr, setNumbers] = useState<number[]>([4, 2, -4, 5, -9, -2, -1]);
  const [inpElems, setInpElems] = useState<JSX.Element[]>([]);
  const [arrStr, setArrStr] = useState<string>("");

  useEffect(() => {
    const iE = numArr.map((elem, index) => {
      return (
        <input
          className={styles.inp}
          type="number"
          id={index}
          key={index}
          value={elem}
          onChange={(value) => {
            setNumbers([
              ...numArr.slice(0, index),
              Number(value.target.value),
              ...numArr.slice(index + 1),
            ]);
          }}
        />
      );
    });
    setInpElems(iE);
    setArrStr("[" + numArr.join(", ") + "]");
  }, [numArr]);

  const onClickIncrement = () => {
    setNumbers([...numArr, randomInt()]);
  };

  const onClickDecrement = () => {
    const newArr = [...numArr];  
    newArr.splice(newArr.length - 1, 1);
    setNumbers(newArr);
    console.log('newArr', newArr)
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h1>Input</h1>
        <p>Array: {arrStr}</p>
        <p>Array Size: {numArr.length}</p>
        <div className={styles.arrayInput}>
          <button className={styles.button} onClick={onClickIncrement}>Add Number +</button>
          <button className={styles.button} onClick={onClickDecrement}>Remove Number -</button>
          <div>{inpElems}</div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <h1>Output:</h1>
        <p>Player Power: {pickCards(numArr).playerPower}</p>
        <p>
          Max amount of cards you can pick:{" "}
          {pickCards(numArr).pickedCards.length}
        </p>
        <p>Picked cards: {arrToString(pickCards(numArr).pickedCards)}</p>
      </div>
    </div>
  );
}
