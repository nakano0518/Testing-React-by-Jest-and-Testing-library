import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import FrameworkList from "./FrameworkList";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

afterEach(() => cleanup());

describe("Rendering the List with props", () => {
  it("Should render No data! when no data propped", () => {
    render(<FrameworkList />);
    expect(screen.getByText("No data!")).toBeInTheDocument(); //要素内容に含まれるか
  });
  it("Should render list item correctly", () => {
    const dummyData = [
      //コンポーネントからpropsを切り離すためモック化
      { id: 1, item: "React dummy" },
      { id: 2, item: "Angular dummy" },
      { id: 3, item: "Vue dummy" },
    ];
    render(<FrameworkList frameworks={dummyData} />);
    const frameworkItems = screen
      .getAllByRole("listitem") //<li>のRoleは"listitem"
      .map((ele) => ele.textContent);
    const dummyItems = dummyData.map((ele) => ele.item);
    expect(frameworkItems).toEqual(dummyItems);
    expect(screen.queryByText("No data!")).toBeNull();
  });
});
