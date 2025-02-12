// src/router.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 각 컴포넌트 임포트
import MainPage from "../pages/main/mainPage";
import Login from "../pages/auth/Login";
import Card1 from "../component/main/Card1";
import Card2 from "../component/main/Card2";
import Card3 from "../component/main/Card3";
import Card4 from "../component/main/card4";
import RegistType from "../pages/auth/registType";
import DonorSignUpForm from "../pages/auth/DonorSignUpForm";
import ApplicantSignUpForm from "../pages/auth/ApplicantSignUpForm";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main/card1" element={<Card1 />} />
        <Route path="/main/card2" element={<Card2 />} />
        <Route path="/main/card3" element={<Card3 />} />
        <Route path="/main/card4" element={<Card4 />} />
        <Route path="/registType" element={<RegistType />} />
        <Route path="/registType/signup/donor" element={<DonorSignUpForm />} />
        <Route path="/registType/signup/applicant" element={<ApplicantSignUpForm />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
