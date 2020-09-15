import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./Context";
import App from "./App";
import "./styles/normalize.css";
import "./styles/global.css";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
