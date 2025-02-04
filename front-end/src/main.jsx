import React from "react";
import ReactDOM from "react-dom/client";
import Card3 from "./component/card3";
import "./style/scss/style.scss"; // 글로벌 스타일 적용
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Signup /> App.jsx 대신 Signup.jsx만 렌더링 */}
    <Card3 />
  </React.StrictMode>
);
