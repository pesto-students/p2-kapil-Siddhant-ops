import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import StepCounter from "./StepCounter";
import { StrictMode } from "react";
import store from "./store";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <StepCounter />
    </Provider>
  </StrictMode>
);
