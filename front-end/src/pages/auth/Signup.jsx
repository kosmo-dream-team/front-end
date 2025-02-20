import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import sign04 from "@/assets/img/auth1.jpg";
import sign02 from "@/assets/img/auth7.jpg";
import sign01 from "@/assets/img/auth8.jpg";
import sign03 from "@/assets/img/auth9.jpg";
import googleLogo from "@/assets/img/google-logo.svg";
import useImageStore from "@/store/useImgStore";
import "@/style/scss/style.scss";
import ImageSwiper from "./ImageSwiper";

export default function Signup() {
  const { setImages } = useImageStore();
  const navigate = useNavigate();
  const location = useLocation();

  // 전달된 state에서 user_type 추출 (쿼리 파라미터와 별도로)
  const defaultUserType = location.state?.user_type || "applicant";

  // URL 쿼리 파라미터로 전달된 googleUser 정보를 파싱
  const searchParams = new URLSearchParams(location.search);
  let googleUserFromQuery = {};
  const googleUserParam = searchParams.get("googleUser");
  if (googleUserParam) {
    try {
      googleUserFromQuery = JSON.parse(decodeURIComponent(googleUserParam));
    } catch (error) {
      console.error("Error parsing googleUser parameter:", error);
    }
  }

  // googleUser는 쿼리 파라미터가 있으면 그 값을, 없으면 빈 객체 사용
  const googleUser =
    Object.keys(googleUserFromQuery).length > 0 ? googleUserFromQuery : {};

  // 초기 formData 설정 : 구글 로그인 정보를 받으면 해당 값이 자동 채워짐
  const [formData, setFormData] = useState({
    email: googleUser.email || "",
    user_name: googleUser.name || "",
    password_hash: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    user_type: defaultUserType,
    profile_image: googleUser.picture || "",
  });

  useEffect(() => {
    // 이미지 파일 상대 경로 배열 설정
    setImages([sign01, sign02, sign03, sign04]);
  }, [setImages]);

  // location.search가 바뀔 경우 폼 데이터 업데이트 (옵션)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const param = params.get("googleUser");
    if (param) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(param));
        setFormData((prevData) => ({
          ...prevData,
          email: parsedUser.email || "",
          user_name: parsedUser.name || "",
          profile_image: parsedUser.picture || "",
        }));
      } catch (error) {
        console.error("Error parsing googleUser parameter:", error);
      }
    }
  }, [location.search]);

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
      !formData.user_name ||
      !formData.password_hash ||
      !formData.phone ||
      !formData.gender
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    if (formData.password_hash !== formData.confirmPassword) {
      alert("비밀번호와 비밀번호 재입력이 일치하지 않습니다.");
      return;
    }

    // confirmPassword를 제외한 데이터 생성
    const { confirmPassword, ...submitData } = formData;

    try {
      const response = await axios.post(
        "http://localhost:8586/api/signup",
        submitData
      );
      console.log("API 호출 성공:", response.data);
      console.log("보내진 데이터:", submitData);
      if (response.data.success === true) {
        alert("회원가입이 완료되었습니다. 다시 로그인 해주세요.");
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
      alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  const handleGoogleLogin = () => {
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
                <div className="input-wrapper">
                  <label htmlFor="user_name">이름</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    placeholder="이름을 입력해주세요"
                  />
                </div>
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
                <div className="input-wrapper">
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
                  <span>가입하기</span>
                </button>
                <input
                  type="hidden"
                  name="user_type"
                  value={formData.user_type}
                />
                {/* 프로필 이미지 URL을 저장하기 위한 hidden input */}
                <input
                  type="hidden"
                  name="profile_image"
                  value={formData.profile_image}
                />
              </form>
            </div>
          </div>
          <div className="other-method">다른 방법으로 가입</div>
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
