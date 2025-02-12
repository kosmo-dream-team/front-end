import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Card1 from "./component/main/Card1";
import Card2 from "./component/main/Card2";
import Card3 from "./component/main/Card3";
import Card4 from "./component/main/Card4";
import RegistType from "./pages/auth/registType";
import Signup from "./pages/auth/signup";
import MainPage from "./pages/main/mainPage";
import "./style/scss/style.scss"; // 글로벌 스타일 적용
import DonorSignUpForm from "./pages/auth/DonorSignUpForm";
import ApplicantSignUpForm from "./pages/auth/ApplicantSignUpForm";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Signup /> App.jsx 대신 Signup.jsx만 렌더링 */}
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main/card1" element={<Card1 />} />
        <Route path="/main/card2" element={<Card2 />} />
        <Route path="/main/card3" element={<Card3 />} />
        <Route path="/main/card4" element={<Card4 />} />
        <Route path="/registType" element={<RegistType />} />
        <Route path="/registType/signup/donor" element={<DonorSignUpForm />} />
        <Route path="/registType/signup/applicant" element={<ApplicantSignUpForm />} />
      </Routes>

    </Router>


    
  </React.StrictMode>
);
