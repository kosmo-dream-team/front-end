// src/HeaderNav.jsx
import React from 'react';
import ".././style/scss/style.scss";

const Header = () => {
  return (
    <div className="header-nav-container">
      <div className="header-nav-inner">
        {/* 로고 영역 */}
        <div className="logo-area">
          <div className="logo-text">DREAM ON</div>
          <div className="logo-underline">
            <div className="logo-underline-inner"></div>
          </div>
        </div>

        {/* 내비게이션 메뉴 영역 */}
        <div className="nav-menu">
          <div className="nav-item home">
            <div className="nav-text">홈</div>
          </div>
          <div className="nav-item company">
            <div className="nav-text">회사 소개</div>
          </div>
          <div className="nav-item campaign">
            <div className="nav-text">캠페인</div>
          </div>
          <div className="nav-item donation">
            <div className="nav-text">기부 통계</div>
            <div className="dot"></div>
          </div>
          <div className="nav-item board1">
            <div className="nav-text">게시판 &amp; Tip</div>
          </div>
          <div className="nav-item board2">
            <div className="nav-text">게시판 &amp; Tip</div>
          </div>
          <div className="nav-item mypage">
            <div className="nav-text">마이페이지</div>
          </div>
        </div>

        {/* 오른쪽 추가 영역 */}
        <div className="right-area">
          <div className="placeholder"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
