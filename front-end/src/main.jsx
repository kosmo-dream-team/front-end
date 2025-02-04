
import React from "react";
import ReactDOM from "react-dom/client";
import Signup from "./pages/auth/signup"; // Signup 컴포넌트 불러오기
import "./style/scss/style.scss"; // 글로벌 스타일 적용
import Favicon from "./component/logo/favicon"; 
import MainPage from './pages/main/mainPage'
import  Header  from "./component/header";
import Category from "./component/category";
import Card1 from "./component/card1";
import Card2 from "./component/card2";
import { Campain1 } from "./component/campain1";
import Card3 from "./component/card3";
import Card4 from "./component/card4";
import Card5 from "./component/card5";
import Footer from "./component/footer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    {/* <Signup /> App.jsx 대신 Signup.jsx만 렌더링 */}
  <Footer />
  </React.StrictMode>
);