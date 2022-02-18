import { renderApp } from "../AppRenderer";

test("render app smoke test", () => {
  renderApp(document.createElement("div"));
});
