// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "./style/scss/style.scss"; // 글로벌 스타일 적용

// 모킹 어댑터 초기화
const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onPost("http://localhost:8586/api/signup").reply(200, {
  message: "Mock 회원가입 성공",
});

// import App from "./App";
// import Router from "./component/routes/Router"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <App />

  </React.StrictMode>
);
