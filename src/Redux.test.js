// Integration(結合)テスト: あるコンポーネントからのReduxのstoreの値を参照、更新するテスト
// ただし、テスト用のRedux storeを別途作成し用いる
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//下記、テストに必要なものの読み込み
import { Provider } from "react-redux"; //(*)
import Redux from "./Redux"; //テスト対象コンポーネント
//下記2文、storeを作成するために必要(store.jsと同様の記述)⇒これを用いてstoreを作成(**)
import { configureStore } from "@reduxjs/toolkit";
import customCounterReducer from "../src/features/customCounter/customCounterSlice";

afterEach(() => {
  cleanup();
});

describe("Redux Integration Test", () => {
  let store;
  //(**)
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it("Should display value with increment by 1 per click", () => {
    //(*)
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("+"));
    expect(screen.getByTestId("count-value")).toHaveTextContent(3);
  });
  it("Should display value with decrement by 1 per click", () => {
    //(*)
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    userEvent.click(screen.getByText("-"));
    userEvent.click(screen.getByText("-"));
    expect(screen.getByTestId("count-value")).toHaveTextContent(-2);
  });
  it("Should display value with incrementAmount", () => {
    //(*)
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    userEvent.type(screen.getByPlaceholderText("Enter"), "30");
    userEvent.click(screen.getByText("IncrementByAmount"));
    expect(screen.getByTestId("count-value")).toHaveTextContent(30);
  });
});
