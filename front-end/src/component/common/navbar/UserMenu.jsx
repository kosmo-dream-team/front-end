// src/components/NavMenus/UserMenu.jsx
import { Link } from "react-router-dom";

export default function UserMenu() {
  return (
    <>
      <Link to="/pages/mypage" className="nav-list">
        마이페이지
      </Link>
      <Link to="/logout" className="nav-list">
        로그아웃
      </Link>
    </>
  );
}
