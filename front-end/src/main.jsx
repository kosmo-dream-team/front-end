import React from "react";
import ReactDOM from "react-dom/client";
import RegistType from "./pages/auth/registType";
import "./style/scss/style.scss"; // 글로벌 스타일 적용
import Favicon from "./component/logo/favicon"; 
import MainPage from './pages/main/mainPage';
import CategoryPage from './pages/category/categoryPage';
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Signup /> App.jsx 대신 Signup.jsx만 렌더링 */}
   <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registType" element={<RegistType />} />
        <Route path="/registType/signup" element={<Signup />} />
      </Routes>
    </Router>
    
  </React.StrictMode>
);
