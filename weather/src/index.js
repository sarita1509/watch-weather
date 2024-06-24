import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { weatherServer } from "./components/server/Index";

if (process.env.NODE_ENV === "development") {
  weatherServer();
}

ReactDOM.renderer(<App />, document.getElementById("root"));