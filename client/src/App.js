import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withContext from "./Context";
import Header from "./components/Header";

const HeaderWithContext = withContext(Header);

function App() {
  return (
    <div className="App">
      <HeaderWithContext />
    </div>
  );
}

export default App;
