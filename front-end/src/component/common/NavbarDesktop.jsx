import { useState } from "react";
import { Link } from "react-router-dom";
import CartIco from "../../assets/img/cart.png";
import SearchIco from "../../assets/img/search.svg";
import UseLoginStore from "../../store/useLoginStore";
import Favicon from "../logo/Favicon";
const menuDb = {
  pageName: "GoodMemory",
  mainPage: "./pages/main/mainPage",
  logoTheme: <Favicon />,
  menuList: [
    { name: "홈", url: "./pages/main/mainPage" },
    { name: "회사 소개", url: "./pages/" },
    { name: "카테고리", url: "./pages/category/CategoryPage" },
    { name: "기부 통계", url: "./pages/" },
    { name: "게시판 & Tip", url: "./pages/" },
    { name: "마이페이지", url: "./pages/" },
  ],
  util: [
    {
      name: "search",
      url: "https://www.twitter.com",
      logo: <img src={SearchIco} alt="" />,
    },
    {
      name: "facebook",
      url: "https://www.facebook.com",
      logo: <img src={CartIco} alt="" />,
    },
  ],
};

function AuthMenu() {
  return (
    <>
      <Link to="/login" className="nav-list">
        로그인
      </Link>
      <Link to="/signup" className="nav-list">
        회원가입
      </Link>
    </>
  );
}
function UserMenu() {
  return (
    <>
      <Link to="/profile" className="nav-list">
        마이페이지
      </Link>
      <Link to="/logout" className="nav-list">
        로그아웃
      </Link>
    </>
  );
}

function IsLogin() {
  const { login } = UseLoginStore();

  return login ? <UserMenu /> : <AuthMenu />;
}

export default function NavbarDesktop() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to={menuDb.mainPage}>{menuDb.logoTheme}</Link>
      </div>

      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          {menuDb.menuList.map((menu, index) => (
            <li key={index}>
              <Link to={menu.url} className="nav-list">
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {menuDb.util.map((data, index) => (
          <Link to key={index} href={data.url}>
            {data.logo}
          </Link>
        ))}
        <IsLogin />
      </div>

      <div className="navbar-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fas fa-bars"></i>
      </div>
    </nav>
  );
}
