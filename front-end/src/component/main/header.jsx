import "@/style/scss/style.scss";

const Header = () => {
  return (
    <div className="navigation-bar">
      <div className="navigation-bar__content">
        {/* 로고 영역 */}
        <div className="navigation-bar__logo">
          <div className="navigation-bar__logo-text">DREAM ON</div>
          <div className="navigation-bar__logo-underline-container">
            <div className="navigation-bar__logo-underline" />
          </div>
        </div>

        {/* 메뉴 영역 */}
        <div className="navigation-bar__menu">
          {/* 메뉴 아이템 – 홈 (선택된 상태: border-bottom 적용) */}
          <div className="navigation-bar__menu-item navigation-bar__menu-item--home">
            <div className="navigation-bar__menu-text">홈</div>
          </div>

          {/* 메뉴 아이템 – 회사 소개 */}
          <div className="navigation-bar__menu-item navigation-bar__menu-item--company">
            <div className="navigation-bar__menu-text">회사 소개</div>
          </div>

          {/* 메뉴 아이템 – 캠페인 */}
          <div className="navigation-bar__menu-item navigation-bar__menu-item--campaign">
            <div className="navigation-bar__menu-text">캠페인</div>
          </div>

          {/* 메뉴 아이템 – 기부 통계 */}
          <div className="navigation-bar__menu-item navigation-bar__menu-item--statistics">
            <div className="navigation-bar__menu-text">기부 통계</div>
            <div className="navigation-bar__menu-dot" />
          </div>

          {/* 메뉴 아이템 – 게시판 & Tip */}
          <div className="navigation-bar__menu-item navigation-bar__menu-item--board">
            <div className="navigation-bar__menu-text">게시판 &amp; Tip</div>
          </div>

          {/* (만약 동일한 메뉴 아이템이 중복되어 있다면 아래 항목을 추가하세요.)
          <div className="navigation-bar__menu-item navigation-bar__menu-item--board">
            <div className="navigation-bar__menu-text">게시판 &amp; Tip</div>
          </div>
          */}

          {/* 메뉴 아이템 – 마이페이지 */}
          <div className="navigation-bar__menu-item navigation-bar__menu-item--mypage">
            <div className="navigation-bar__menu-text">마이페이지</div>
          </div>
        </div>

        {/* 오른쪽 스페이서 (추가 여백용) */}
        <div className="navigation-bar__spacer">
          <div className="navigation-bar__spacer-inner" />
        </div>
      </div>
    </div>
  );
};

export default Header;
