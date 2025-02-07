import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Card3 from "./component/main/card3";
import RegistType from "./pages/auth/registType";
import Signup from "./pages/auth/signup";
import MainCategory from "./pages/main/mainPage";
import "./style/scss/style.scss"; // 글로벌 스타일 적용

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Signup /> App.jsx 대신 Signup.jsx만 렌더링 */}
    <Router>
      <Routes>
        <Route path="/ca" element={<MainCategory />} />
        <Route path="/registType" element={<RegistType />} />
        <Route path="/registType/signup" element={<Signup />} />
      </Routes>
    </Router>

    <Card3 />
  </React.StrictMode>
);
