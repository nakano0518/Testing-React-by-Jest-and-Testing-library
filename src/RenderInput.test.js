import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; //入力・クリックなどのブラウザ上でのユーザーの操作をシミュレートするAPI
import RenderInput from "./RenderInput";

// 各テストケース(it)の後に実行する処理
afterEach(() => cleanup()); // cleanup(): render(コンポーネント)のレンダリングをアンマウント

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<RenderInput />);
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy(); //getByPlaceholderText(): 引数のplaceholder属性を有する要素
  });
});

describe("Input form onChange event", () => {
  it("Should update input value correctly", () => {
    render(<RenderInput />);
    const inputValue = screen.getByPlaceholderText("Enter");
    userEvent.type(inputValue, "test"); // 入力操作、第一引数(要素)、第二引数(入力値)
    expect(inputValue.value).toBe("test"); // toBe(): (引数に)一致するか
  });
});

describe("Console button conditionary triggered", () => {
  it("Should not trigger output function", () => {
    const outputConsole = jest.fn(); // (propsに渡した)関数のモック⇒コンポーネント単位のテストなので切り離す
    render(<RenderInput outputConsole={outputConsole} />);
    userEvent.click(screen.getByRole("button"));
    expect(outputConsole).not.toHaveBeenCalled(); //関数がcallされない
  });
  it("Should trigger output function", () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);
    const inputValue = screen.getByPlaceholderText("Enter");
    userEvent.type(inputValue, "test");
    userEvent.click(screen.getByRole("button"));
    expect(outputConsole).toHaveBeenCalledTimes(1); // 呼ばれる回数指定
  });
});
