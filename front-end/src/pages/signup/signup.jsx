import React, { useState } from 'react';
import "../../style/scss/style.scss";

function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 폼 제출:', formData);
    // 회원가입 처리 로직
  };

  return (
    <div className="signup-container">
      {/* 상단 로고 */}
      <div className="favicon">
        <div className="favicon-text">DREAM ON</div>
        <div className="favicon-line">
          <div className="favicon-line-gradient"/>
        </div>
      </div>

      {/* 오른쪽 이미지+텍스트 영역 */}
      <div className="signup-right">
        <div className="signup-right-bg">
          <img
            src="https://via.placeholder.com/735x880"
            alt="signup"
          />
        </div>
        <div className="signup-right-text1">
          <div className="big-title">작은 손길, 큰 변화</div>
          <div className="small-title">희망을 선물하는 가장 쉬운 방법</div>
        </div>
        <div className="signup-right-subtitle">드림온 프로젝트</div>
      </div>

      {/* 왼쪽 회원가입 폼 영역 */}
      <div className="signup-left">
        <div className="signup-top">
          <div className="signup-title-area">
            <div className="signup-title">회원가입</div>
            <div className="signup-subinfo">
              <div className="already">이미 계정이 있으신가요?</div>
              <div
                className="goto-login"
                onClick={() => alert('로그인 페이지로 이동')}
              >
                로그인 하기
              </div>
            </div>
          </div>
          <div className="signup-form-area">
            <form onSubmit={handleSubmit}>
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

              {/* 비밀번호 */}
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

              {/* 옵션, 비밀번호 찾기 */}
              <div className="options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div
                  className="forgot-pw"
                  onClick={() => alert('비밀번호 찾기 페이지로 이동')}
                >
                  Forgot Password ?
                </div>
              </div>

              {/* 가입하기 버튼 */}
              <button type="submit" className="signup-button">
                <span>가입하기</span>
              </button>
            </form>
          </div>
        </div>
        <div className="other-method">다른 방법으로 가입</div>
      </div>

      {/* 소셜 로그인(구글) 예시 */}
      <div className="social-google" onClick={() => alert('구글 로그인')}>
        <div className="google-icon-blocks">
          <div className="red-box" />
          <div className="yellow-box" />
          <div className="blue-box" />
          <div className="green-box" />
        </div>
        <img
          className="google-img"
          src="https://via.placeholder.com/57x62"
          alt="google-login"
        />
      </div>
    </div>
  );
}

export default Signup;
