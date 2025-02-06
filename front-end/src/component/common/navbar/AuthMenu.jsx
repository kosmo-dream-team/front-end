import { Link } from "react-router-dom";

export default function AuthMenu() {
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
