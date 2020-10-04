import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import useEvent from "@testing-library/user-event";

//msw(mock server worker) //required "npm install msw --save-dev"
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import MockServer from "./MockServer";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

//最初に一度実行
beforeAll(() => server.listen()); //モックサーバーの起動

afterEach(() => {
  server.resetHandlers(); //モックサーバーリセット
  cleanup();
});

//最後に一度実行
afterAll(() => server.close()); //モックサーバーの停止

describe("Mocking API", () => {
  it("[Fetch success]Should display fetched data correctly and button disabled", async () => {
    render(<MockServer />);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByRole("heading")).toHaveTextContent("Bred dummy");
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });
  it("[Fetch failure]Should display error msg, no render heading and button abled", async () => {
    server.use(
      // レスポンスの内容を一時的に書き換える(it内でのみ有効)
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Fetching Failed !"
    );
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });
});
