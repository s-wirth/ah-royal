'use client'

import { useEffect, useState } from "react";

function randomInt() {
  const posNeg = Math.sign(Math.random()-0.5);
  return Math.floor(Math.random() * (99 - 0 + 1) + 0) * posNeg;
}
export default function Home() {
  const [numArr, setNumbers] = useState<number[]>([randomInt(), randomInt(), randomInt()])
  const [inpElems, setInpElems] = useState<JSX.Element[]>([])

  useEffect(() => {
    console.log(numArr)
    const iE = numArr.map((elem, index) => {
    return (
      <input type="number" key={index} value={elem} onChange={(value) => {numArr[index] = value}} />
    )})
    setInpElems(iE)
  }, [numArr])
  
  const onClickIncrement = () => {
    setNumbers([...numArr, randomInt()])
  }

  const onClickDecrement = () => {
    setNumbers(numArr.pop())
  }
  return (
    <div>
      Array Size
      <button onClick={onClickIncrement}>+</button>
      <button onClick={onClickDecrement}>-</button>
      {inpElems}
    </div>
  );
}
