import React from "react";
import { render, screen } from "@testing-library/react";
import UserEffectRender from "./UsrEffectRender";

describe("useEffect rendering", () => {
  it("Should render only after async function resolved", async () => {
    render(<UseEffectRender />);
    expect(screen.queryByText(/I am/)).toBeNull();
    expect(await screen.findByText(/I am/)).toBeInTheDocument(); //findByTextのfindが付くものは非同期処理が完了するまで待機(4秒経つとTime out error)
  });
});
