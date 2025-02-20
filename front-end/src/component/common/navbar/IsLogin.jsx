import useLoginStore from "@/store/UseLoginStore";
import useUserProfile from "@/store/useUserProfile";
import { Link } from "react-router-dom";

function UserMenu() {
  const { profile } = useUserProfile();
  const { setLogin } = useLoginStore();

  const logout = () => {
    setLogin("false"); // 로그인 상태 업데이트
    window.location.reload();
  };

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
      <button className="logout-button" onClick={logout}>
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

export default function IsLogin() {
  const { login } = useLoginStore();
  return login === "false" ? <AuthMenu /> : <UserMenu />;
}
