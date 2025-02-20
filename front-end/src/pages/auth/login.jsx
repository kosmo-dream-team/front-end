import sign04 from "@/assets/img/auth1.jpg";
import sign02 from "@/assets/img/auth7.jpg";
import sign01 from "@/assets/img/auth8.jpg";
import sign03 from "@/assets/img/auth9.jpg";
import googleLogo from "@/assets/img/google-logo.svg";
import useImageStore from "@/store/useImgStore";
import useUserProfile from "@/store/useUserProfile";
import "@/style/scss/style.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageSwiper from "./ImageSwiper";

function Login() {
  // 초기 formData에서 password 대신 password_hash 사용
  const [formData, setFormData] = useState({ email: "", password_hash: "" });
  const navigate = useNavigate();
  const { setProfile } = useUserProfile(); // 프로필 상태를 지정
  const { setImages } = useImageStore();

  useEffect(() => {
    // 이미지 파일 상대 경로 배열 설정
    setImages([sign01, sign02, sign03, sign04]);
  }, [setImages]);

  // 로그인 폼 입력값 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("보낸 데이터", formData);
    try {
      // Axios를 사용해 POST 요청 전송 (URL은 백엔드 매핑에 맞게 수정 필요)
      const response = await axios.post(
        "http://localhost:8586/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 응답 데이터가 없으면 로그인 실패 처리
      if (!response.data) {
        alert("아이디와 비밀번호를 다시 확인해주세요.");
        window.location.reload();
        return;
      }

      const data = response.data;
      const mappedProfile = {
        user_id: data.user_id,
        user_name: data.user_name,

        password_hash: data.password_hash,
        email: data.email,
        phone: data.phone,
        user_type: data.user_type,
        gender: data.gender,
        rank: data.rank,
        total_donation_count: data.total_donation_count,
        profile_image: data.img,
      };

      setProfile(mappedProfile);
      alert("로그인 성공");
      console.log("가져온 데이터 ", response.data);
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };
  const handleGoogleLogin = () => {
    //
    window.location.href = "http://localhost:8586/oauth2/authorization/google";
  };
  return (
    <div className="signup-container">
      <div className="signup-left-form-container">
        <div className="signup-left">
          <div className="favicon">
            <div className="favicon-text">DREAM ON</div>
            <div className="favicon-line">
              <div className="favicon-line-gradient" />
            </div>
          </div>
          <div className="signup-top">
            <div className="signup-title-area">
              <div className="signup-title">로그인</div>
              <div className="signup-subinfo">
                <div className="already">이미 계정이 있으신가요?</div>
                <div
                  className="goto-login"
                  onClick={() => alert("로그인 페이지로 이동")}
                >
                  로그인 하기
                </div>
              </div>
            </div>
            <div className="signup-form-area">
              <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                  <label htmlFor="email">이메일</label>
                  <input
                    className="input-email"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력해주세요"
                  />
                </div>
                <div className="input-wrapper password">
                  <label htmlFor="password_hash">비밀번호</label>
                  <input
                    type="password"
                    id="password_hash"
                    name="password_hash"
                    value={formData.password_hash}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력해주세요"
                  />
                </div>
                <div className="options">
                  <div className="remember-me">
                    <input type="checkbox" id="rememberMe" name="rememberMe" />
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  <div
                    className="forgot-pw"
                    onClick={() => alert("비밀번호 찾기 페이지로 이동")}
                  >
                    <a href="/find-password">비밀번호를 잊으셨나요?</a>
                  </div>
                </div>
                <button type="submit" className="signup-button">
                  <span>로그인</span>
                </button>
              </form>
            </div>
          </div>
          <div className="other-method">다른 방법으로 로그인</div>
        </div>
        <div className="social-login">
          <img
            src={googleLogo}
            alt="구글로 로그인하기"
            onClick={handleGoogleLogin}
          />
        </div>
      </div>
      <div className="signup-right-img-container">
        <ImageSwiper className="signup-img" />
        <div className="signup-right-text1">
          <div className="big-title">작은 손길, 큰 변화</div>
          <div className="small-title">희망을 선물하는 가장 쉬운 방법</div>
        </div>
        <div className="signup-right-subtitle">드림온 프로젝트</div>
      </div>
    </div>
  );
}

export default Login;
