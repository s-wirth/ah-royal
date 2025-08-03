'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";

function randomInt() {
  const posNeg = Math.sign(Math.random()-0.5);
  return Math.floor(Math.random() * (99 - 0 + 1) + 0) * posNeg;
}
export default function Home() {
  const [numArr, setNumbers] = useState<number[]>([randomInt(), randomInt(), randomInt()])
  const [inpElems, setInpElems] = useState<JSX.Element[]>([])
  const [arrStr, setArrStr] = useState<string>("")

  useEffect(() => {
    console.log(numArr)
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
    </div>
  );
}
