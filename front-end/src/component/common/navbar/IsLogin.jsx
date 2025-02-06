import { Link } from "react-router-dom";
import UseLoginStore from "../../../store/useLoginStore";

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

export default function IsLogin() {
  const { login } = UseLoginStore();
  return login ? <UserMenu /> : <AuthMenu />;
}
