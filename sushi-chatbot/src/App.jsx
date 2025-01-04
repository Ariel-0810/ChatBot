import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navigator from "../src/routes/routes";

const startTransitionFlag = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};
function App() {
  return (
    <BrowserRouter future={startTransitionFlag}>
      <Navigator />
    </BrowserRouter>
  );
}

export default App;
