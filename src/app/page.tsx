'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";

function randomInt() {
  const posNeg = Math.sign(Math.random()-0.5);
  const ranNum = Math.floor(Math.random() * (10 - 0 + 1) + 0) * posNeg;
  return ranNum === 0 ? randomInt() : ranNum;
}

function arraySum(arr: number[]) {
  if(!arr){
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
  if(!negCardArr || negCardArr.length === 0){
    return;
  }
  console.log('negCardArr', negCardArr)
  const cardSum = arraySum(negCardArr)
  if (pp - cardSum <= 0) {
    return negCardArr;
  } else (
    negCardRed(pp, negCardArr.slice(1))
  )
}
function pickCards(cardsArr: number[]) {
  if (cardsArr.length === 0) {
    return;
  }
  const splitCards = []
  let playerPower = 0
  const pickedCards = []
  cardsArr.forEach((c) => {
    const sCL = splitCards.length-1;
    if (sCL === -1) {
      splitCards.push([c])
    } else {
      if ((splitCards[sCL][0] < 0 && c < 0) || (splitCards[sCL][0] > 0 && c > 0)) {
        splitCards[sCL].push(c)
      } else {
        splitCards.push([c])
      }
    }
  })

  splitCards.forEach((cA) => {
    if(cA[0] > 0) {
      pickedCards.push(...cA)
      playerPower += arraySum(cA)
    }
    if(cA[0] < 0 && playerPower > 0) {
      const reducedNegativeArr = negCardRed(playerPower, cA);
      console.log('reducedNegativeArr', reducedNegativeArr)
      pickedCards.push(...reducedNegativeArr);
    }
  })
  console.log('pickedCards', pickedCards)
  console.log('playerPower', playerPower)
  console.log('splitCards', splitCards)
}
export default function Home() {
  const [numArr, setNumbers] = useState<number[]>([randomInt(), randomInt(), randomInt()])
  const [inpElems, setInpElems] = useState<JSX.Element[]>([])
  const [arrStr, setArrStr] = useState<string>("")

  useEffect(() => {
    const iE = numArr.map((elem, index) => {
    return (
      <input className={styles.inp} type="number" key={index} value={elem} onChange={(value) => {numArr[index] = value}} />
    )})
    setInpElems(iE)
    setArrStr("[" + numArr.join(", ") + "]")
  }, [numArr])
  
  const onClickIncrement = () => {
    setNumbers([...numArr, randomInt()])
  }

  const onClickDecrement = () => {
    setNumbers(numArr.pop())
  }
  return (
    <div>
      <p>Array: {arrStr}</p>
      <p>Array Size: {numArr.length}</p>
      <div>Add Number <button onClick={onClickIncrement}>+</button></div>
      
      <div>Remove Number <button onClick={onClickDecrement}>-</button></div>
      {inpElems}
      <div>
        <p>Max Cards you can pick up: {pickCards(numArr)}</p>
      </div>
    </div>
  );
}
