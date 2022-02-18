import { StrictMode } from "react";
import ReactDOM from "react-dom";
import KitchenSink from "./frontend/dev/KitchenSink";
import reportWebVitals from "./frontend/reportWebVitals";

export function renderApp(container: HTMLElement) {
  ReactDOM.render(
    <StrictMode>
      <KitchenSink />
    </StrictMode>,
    container
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
