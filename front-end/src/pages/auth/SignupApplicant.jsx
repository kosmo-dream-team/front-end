import axios from "axios";
import MockAdapter from "axios-mock-adapter"; // 모킹 어댑터 import
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import card1 from "../../assets/img/Card1.png";
import googleLogo from "../../assets/img/google-logo.svg";
import sign01 from "../../assets/img/sign01.png";
import sign02 from "../../assets/img/아동.png";
import useImageStore from "../../store/useImgStore";
import "../../style/scss/style.scss";
import ImageSwiper from "./ImageSwiper";

// axios 모킹 설정 (개발 환경에서만 사용)
const mock = new MockAdapter(axios, { delayResponse: 500 }); // 0.5초 지연 (옵션)
mock.onPost("http://localhost:8586/api/signup").reply(200, {
  message: "Mock 회원가입 성공",
});

export default function SignUpApplicant() {
  const { setImages } = useImageStore();
  const navigate = useNavigate();

  useEffect(() => {
    // 이미지 파일 상대 경로 배열 설정
    setImages([sign01, sign02, card1]);
  }, [setImages]);

  // 입력 필드 관리를 위한 상태값
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    userType: "applicant",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // 가입하기 버튼 클릭 시 API 호출하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 항목 검증
    if (
      !formData.email ||
      !formData.name ||
      !formData.password ||
      !formData.phone ||
      !formData.gender
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호와 비밀번호 재입력이 일치하지 않습니다.");
      return;
    }

    // API 요청 실행 (백엔드가 없더라도 모킹이 동작하여 성공 응답을 반환합니다.)
    try {
      const response = await axios.post(
        "http://localhost:8586/api/signup",
        formData
      );
      console.log("API 호출 성공:", response.data);
      console.log("보내진 데이터:", formData);
      // API 호출 성공 후 페이지 이동
      navigate("/");
    } catch (error) {
      console.error("API 호출 실패:", error);
      alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left-form-container">
        {/* 왼쪽 회원가입 폼 영역 */}
        <div className="signup-left">
          {/* 상단 로고 영역 */}
          <div className="favicon">
            <div className="favicon-text">DREAM ON</div>
            <div className="favicon-line">
              <div className="favicon-line-gradient" />
            </div>
          </div>
          <div className="signup-top">
            <div className="signup-title-area">
              <div className="signup-title">회원가입</div>
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
              <form onSubmit={handleSubmit} className="signup-form">
                {/* 이메일 */}
                <div className="input-wrapper">
                  <label htmlFor="email">이메일</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력해주세요"
                  />
                </div>
                {/* 성별 선택 */}
                <div className="input-wrapper">
                  <label>성별</label>
                  <div className="gender-options">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                        aria-label="남자"
                      />
                      남자
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                        aria-label="여자"
                      />
                      여자
                    </label>
                  </div>
                </div>
                {/* 이름 */}
                <div className="input-wrapper">
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름을 입력해주세요"
                  />
                </div>
                {/* 전화번호 */}
                <div className="input-wrapper">
                  <label htmlFor="phone">전화번호</label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="전화번호를 입력해주세요"
                  />
                </div>
                {/* 비밀번호 */}
                <div className="input-wrapper">
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
                {/* 비밀번호 재입력 */}
                <div className="input-wrapper">
                  <label htmlFor="confirmPassword">비밀번호 재입력</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="비밀번호를 다시 입력해주세요"
                  />
                </div>
                {/* 옵션 및 비밀번호 찾기 영역 */}
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
                {/* 가입하기 버튼 */}
                <button type="submit" className="signup-button">
                  <span>가입하기</span>
                </button>
                <input
                  type="hidden"
                  name="userType"
                  value={formData.userType}
                />
              </form>
            </div>
          </div>
          <div className="other-method">다른 방법으로 가입</div>
        </div>
        {/* 소셜 로그인 영역 */}
        <div className="social-login">
          {/* <img
            src={kakaoLogo}
            alt="카카오로 로그인"
            onClick={() => alert("카카오 로그인")}
          /> */}
          <img
            src={googleLogo}
            alt="구글로 로그인"
            onClick={() => alert("구글 로그인")}
          />
        </div>
      </div>
      {/* 오른쪽 이미지 및 텍스트 영역 */}
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
