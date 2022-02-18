import { act } from "react-dom/test-utils";
import { renderApp } from "../AppRenderer";

test("render kitchen sink smoke test", async () => {
  // this is not the testing-library, everything is pure react and jest
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    renderApp(document.createElement("div"));
  });
});
