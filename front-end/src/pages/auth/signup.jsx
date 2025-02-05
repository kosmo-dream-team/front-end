import React, { useState } from 'react';
import "../../style/scss/style.scss";
import sign01 from '../../assets/img/sign01.png';
import googleLogo from '../../assets/img/google-logo.svg';
import kakaoLogo from '../../assets/img/kakao-logo.svg';
import { Link } from 'react-router-dom';


function Signup() {
  // 이메일, 이름, 비밀번호, 비밀번호 재입력 필드를 위한 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email == '') {
        alert("이메일을 입력해주세요.")
    }
    else if (formData.name == '') {
      alert("이름을 입력해주세요")
    }
    
    else if (formData.password == '') {
      alert("패스워드를 입력해주세요")
    }
    

    // 2. 이메일 형식 검증 (간단한 정규식 사용)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("유효한 이메일 주소를 입력해 주세요.");
      return;
    }

    // 3. 비밀번호와 비밀번호 재입력이 일치하는지 확인
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호와 비밀번호 재입력이 일치하지 않습니다.");
      return;
    }

    // 모든 검증이 통과하면 실제 회원가입 처리 로직 실행
    console.log("회원가입 폼 제출:", formData);
    // 여기에 서버로 데이터를 전송하는 로직 추가
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
                  onClick={() => alert('로그인 페이지로 이동')}
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
                    <a href="/find-password">비밀번호를 잊으셨나요?</a>
                  </div>
                </div>
                {/* 가입하기 버튼 */}
                <button type="submit" className="signup-button">
                  
                    <Link to="/"><span>가입하기</span></Link>
                   
                </button>
              </form>
            </div>
          </div>
          <div className="other-method">다른 방법으로 가입</div>
        </div>
        {/* 소셜 로그인 (구글 예시) */}
        <div className="social-login">
          <img
            src={kakaoLogo}
            alt="카카오로 로그인"
            onClick={() => alert('카카오 로그인')}
          />
          <img
            src={googleLogo}
            alt="구글로 로그인"
            onClick={() => alert('구글 로그인')}
          />
        </div>
      </div>
      {/* 오른쪽 이미지+텍스트 영역 */}
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

export default Signup;
