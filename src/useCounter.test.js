// CustomHooksをテストするためにライブラリ(2つ)をインストールする必要がある
// npm i @testing-library/react-hooks を実行 // iはinstallの略
// npm i react-test-renderer を実行

import { useCounter } from "./useCounter"; // テストするCustomHook(useCounter)をimport
import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

describe("useCounter custom Hook", () => {
  it("Should increment by 1", () => {
    const { result } = renderHook(() => useCounter(3)); // useCounter(初期値)の実行結果をresultで受け取る
    expect(result.current.count).toBe(3); // result.currentにuseCounterでreturnした物が格納される
    // 関数にアクセスする際はactで囲む
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(4);
  });
  it("Should decrement by 1", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(2);
  });
  it("Should double the counter value", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.double();
    });
    expect(result.current.count).toBe(6);
  });
  it("Should triple the counter value", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.triple();
    });
    expect(result.current.count).toBe(9);
  });
  it("Should reset to zero", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});
