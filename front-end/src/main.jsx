
import React from "react";
import ReactDOM from "react-dom/client";
import Signup from "./pages/auth/signup"; // Signup 컴포넌트 불러오기
import "./style/scss/style.scss"; // 글로벌 스타일 적용
import Favicon from "./component/logo/favicon"; 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    {/* <Signup /> App.jsx 대신 Signup.jsx만 렌더링 */}
    <Signup />
  </React.StrictMode>
);