import { StrictMode } from "react";
import { render } from "react-dom";
import Title from "./Title";
import ZipcodeInput from "./ZipcodeInput";

const App = () => {
  return (
    <div>
      <Title title="Garden planner" />
      <ZipcodeInput />
    </div>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
