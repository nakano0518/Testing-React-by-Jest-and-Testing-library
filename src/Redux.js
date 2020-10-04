import React from "react";
// useSelecter(storeのstateを参照する)とuseDispatch(storeのstateを更新する)の読み込み
import { useSelector, useDispatch } from "react-redux";
//customCounterSlice.jsから関数の読み込み（上記Hooksを使用する際に併用する関数）
import {
  selectCount,
  increment,
  decrement,
  incrementByAmount,
} from "./features/customCounter/customCounterSlice";

const Redux = () => {
  const [number, setNumber] = React.useState(""); //incrementByAmountに渡すユーザー入力値を保持するstate
  const count = useSelector(selectCount); //storeからcounterの値を取得
  const dispatch = useDispatch(); //useDispatch()の返り値(関数)をdispatchに格納し、JSXで実行できるようにしておく
  return (
    <div>
      <h3>Redux Integration Test</h3>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span data-testid="count-value">{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
        {/*数字以外が渡されると0*/}
        <button onClick={() => dispatch(incrementByAmount(number | 0))}>
          IncrementByAmount
        </button>
        <input
          type="text"
          placeholder="Enter"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Redux;
