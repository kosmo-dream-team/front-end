import { useState } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../../store/useUserProfile";
import googleLogo from "../../assets/img/google-logo.svg";
import kakaoLogo from "../../assets/img/kakao-logo.svg";
import sign01 from "../../assets/img/sign01.png";
import "../../style/scss/style.scss";

// 로그인 모킹 설정 (개발 환경에서만 사용)
const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onPost("http://localhost:8586/api/login").reply(200, {
  nickname: "홍길23동",
  password: "12345678910",
  phone: "010123123123",
  email: "orm123123@gmaul.com",
  age: "1980-01-01",
  sex: "남성",
  rank: "골드",
  totalDonationCount: "1004",
  profileImage:
    "https://i.namu.wiki/i/VrVvnKwZ-OR_dqWJfiQQZoOgnTmAQeZ_QTyDCPa3KDhF4V_oaHr4nIbVEebqDZYj5GJH75ft1UKfU9PMaqh93w.webp",
});

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setProfile } = useUserProfile(); // 새로 추가한 setProfile 함수 사용

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8586/api/login", formData);
      console.log("로그인 성공:", response.data);
      
      // 필요시, 로그인 응답 데이터를 store에 맞게 매핑
      const mappedProfile = {
        name: response.data.nickname,
        password: response.data.password,
        email: response.data.email,
        phone: response.data.phone || "",
        age: response.data.age,
        gender: response.data.sex,
        rank: response.data.rank,
        totalDonationCount: response.data.totalDonationCount,
        img: response.data.profileImage,
      };
      
      setProfile(mappedProfile); 
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패. 다시 시도해주세요.");
    }
  };

  return (
    <div className="signup-container">
      {/* ... 로그인 UI 유지 ... */}
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
                <div className="goto-login" onClick={() => alert("로그인 페이지로 이동")}>
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
                  <label htmlFor="password">비밀번호</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력해주세요"
                  />
                </div>
                <div className="options">
                  <div className="remember-me">
                    <input type="checkbox" id="rememberMe" name="rememberMe" />
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  <div className="forgot-pw" onClick={() => alert("비밀번호 찾기 페이지로 이동")}>
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
            src={kakaoLogo}
            alt="카카오로 로그인하기"
            onClick={() => alert("카카오 로그인")}
          />
          <img
            src={googleLogo}
            alt="구글로 로그인하기"
            onClick={() => alert("구글 로그인")}
          />
        </div>
      </div>
      <div className="signup-right-img-container">
        <img className="signup-img" src={sign01} alt="웃는 아이의 이미지" />
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
