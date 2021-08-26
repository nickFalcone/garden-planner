import { StrictMode } from "react";
import { render } from "react-dom";
import Title from "./Title";
import Features from "./Features";

const App = () => {
  return (
    <div>
      <Title title="Base React TypeScript Template" />A template{" "}
      <a href="https://github.com/nickFalcone/base-react-ts">repo</a> for
      TypeScript React projects based on Brian Holt&apos;s{" "}
      <a href="https://github.com/btholt/citr-v6-project/blob/master/typescript-5/src/index.html">
        Intermediate React v3
      </a>
      . Includes:
      <Features list={["TypeScript configs", "Prettier", "ESLint"]} />
    </div>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
