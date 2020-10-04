//VSCODEのアロー関数コンポーネントひな形⇒rafce(ReactArrowFunctonComponentECMA)
import React from "react";
import { useCounter } from "./useCounter"; //CustomHook(useCounter)のimport

const CustomHooks = () => {
  const { count, increment, decrement, double, triple, reset } = useCounter(3); //引数に初期値、返り値にuseCounterで定義したreturnの部分
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={double}>Double</button>
      <button onClick={triple}>Triple</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default CustomHooks;
