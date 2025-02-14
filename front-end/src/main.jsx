// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "./style/scss/style.scss";


// axios-mock-adapter 인스턴스 생성 (응답 지연시간 500ms)
const mock = new MockAdapter(axios, { delayResponse: 500 });

// /donations 엔드포인트에 대한 POST 요청을 목 처리
mock.onPost("http://localhost:3001/donations").reply((config) => {
  // 필요하면 config.data를 확인해 요청 데이터를 파싱할 수 있습니다.
  // 예: const requestData = JSON.parse(config.data) 또는 FormData의 경우 직접 처리
  return [201, { id: 1, message: "Donation created successfully" }];
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
