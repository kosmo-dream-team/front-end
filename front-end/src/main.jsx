// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./route/router";  // router.jsx 파일에서 AppRouter를 import 합니다.
import "./style/scss/style.scss"; // 글로벌 스타일

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
