// src/router.jsx

import { Route, Routes } from "react-router-dom";

// 각 컴포넌트 임포트

import Login from "@/pages/auth/Login";
import RegistType from "@/pages/auth/registType";
import SignUpApplicant from "@/pages/auth/signupApplicant";
import SignUpDonor from "@/pages/auth/SignupDonor";
import CampaignPage from "@/pages/campaign/CampaignPage";
import CategoryPage from "@/pages/category/CategoryPage";
import MainPage from "@/pages/main/mainPage";
import MyPage from "@/pages/mypage/MyPage";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />

      <Route path="/pages/mypage" element={<MyPage />} />
      <Route path="/pages/category" element={<CategoryPage />} />
      <Route path="/registType" element={<RegistType />} />
      <Route path="/registType/signup/donor" element={<SignUpDonor />} />
      <Route
        path="/registType/signup/applicant"
        element={<SignUpApplicant />}
      />

      <Route path="/campaign" element={<CampaignPage />} />
    </Routes>
  );
};

export default AppRouter;
