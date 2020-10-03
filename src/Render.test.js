// .test.jsという拡張子にすると、Jestが自動的にテストファイルだと識別
// npm testを実行したときにテストケース名が表示されないので、package.jsonのscriptのtestに --env=jsdom --verbose を追記
import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render"; //テスト対象のコンポーネント

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<Render />); //コンポーネントにアクセス
    // screen.debug(); //renderで取得した内容の取得

    // HTMLタグにはRoleがある。screen.getByRole("heading")でh1(h2,h3..)取得
    // https://github.com/A11yance/aria-query#elements-to-roles
    // screen.debug(screen.getByRole("heading"));

    // テストケース判定: expect(要素内容).マッチャー
    // Jest標準のマッチャー: https://jestjs.io/docs/en/expect
    // Testing-Library独自の拡張マッチャー: https://github.com/testing-library/jest-dom#custom-matchers
    expect(screen.getByRole("heading")).toBeTruthy(); //toBeTruthy(): 存在するか
    expect(screen.getByRole("textbox")).toBeTruthy();
    // getAllByRole(): 引数のRoleの要素をすべて取得(戻り値：配列)、インデックス番号でアクセス
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();
    // screen.debug(screen.getByText("Udemy")); // getByText(): 引数の要素内容を有する要素全体を取得
    expect(screen.getByText("Udemy")).toBeTruthy();
    expect(screen.queryByText("Udeeeemy")).toBeNull(); //queryByText(): 引数に該当なしの場合nullを返却 //toBeNull(): nullか
    expect(screen.getByTestId("copyright")).toBeTruthy(); // getBy+データID属性名(値)
  });
});
