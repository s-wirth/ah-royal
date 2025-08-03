'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [numArr, setNumbers] = useState<number[]>([1, 2, 3])
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
    setNumbers([...numArr, 1])
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
