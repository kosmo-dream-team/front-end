import useUserProfile from "@/store/useUserProfile";
import { useState } from "react";
import { Link } from "react-router-dom";

function UserMenu({ onLogout }) {
  const { profile } = useUserProfile();

  return (
    <>
      <div className="nav-list">
        {profile.rank} 클래스 {profile.user_name} 님 <br />
        환영합니다
      </div>
      <img
        className="login-profile-card-img"
        src={profile.profile_image}
        alt="Profile"
        style={{
          cursor: "pointer",
          border: "0.3rem solid #ff9191",
          borderStyle: "outset",
        }}
      />
      <button className="logout-button" onClick={onLogout}>
        로그아웃
      </button>
    </>
  );
}

function AuthMenu() {
  return (
    <>
      <Link to="/login" className="nav-list">
        로그인
      </Link>
      <Link to="/registType" className="nav-list">
        회원가입
      </Link>
    </>
  );
}

export default function UserInfo() {
  const { profile } = useUserProfile();

  // 회원 이름이 있으면 로그인 상태
  const [isLogin, setLogin] = useState(profile.user_name !== null);

  const handleLogout = () => {
    // 로그아웃 시 상태를 false로 업데이트합니다.
    setLogin(false);
    // 필요하다면 추가적인 로그아웃 작업(예: 토큰 삭제, 서버 로그아웃 요청 등)을 진행합니다.
    window.location.reload();
  };

  return isLogin ? <UserMenu onLogout={handleLogout} /> : <AuthMenu />;
}
