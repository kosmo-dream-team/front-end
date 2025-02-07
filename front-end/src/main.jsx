import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Card3 from "./component/main/card3";
import RegistType from "./pages/auth/registType";
import Signup from "./pages/auth/signup";
import MainPage from "./pages/main/mainPage";
import "./style/scss/style.scss"; // 글로벌 스타일 적용
import Profile from "./component/my/profile";
import DonationInfo from "./component/my/DonationInfo";
import ProfileEditForm from "./component/my/ProfileEditForm";
import AdminPage from "./pages/admin/admin";
import Stats from "./component/stats/Stats";
import Card from "./component/campain/Card";
import Article from "./component/campain/Article";
import MonthlyDonationChart from "./component/stats/MonthlyDonation";
import CategoryPage from "./pages/category/categoryPage";
import Stats1 from "./pages/stats/Stats";





ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Signup /> App.jsx 대신 Signup.jsx만 렌더링 */}
     {/* { <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registType" element={<RegistType />} />
        <Route path="/registType/signup" element={<Signup />} />
      </Routes>
    </Router>   } */}
    <Stats1 />
    
    
    
    
  
    

  </React.StrictMode>
);
