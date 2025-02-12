import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/scss/style.scss"; // 글로벌 스타일 적용
// import App from "./App";
// import Router from "./component/routes/Router"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
