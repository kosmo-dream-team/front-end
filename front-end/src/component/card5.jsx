import React from 'react';
import ".././style/scss/style.scss";

const Card5 = () => {
  return (
    <div className="donation-suggestion">
      {/* 그라데이션 오버레이 */}
      <div className="donation-suggestion__overlay" />

      {/* 텍스트 */}
      <div className="donation-suggestion__text">
        기부 모금함을 제안하고 싶다구요?
        <br />
        <br />
      </div>

      {/* 아이콘 영역 */}
      <div className="donation-suggestion__icon-container">
        <div className="donation-suggestion__icon">
          <div className="donation-suggestion__icon-bg" />
          <div className="donation-suggestion__icon-line" />
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="donation-suggestion__button-container">
        <div className="donation-suggestion__button-bg" />
        <div className="donation-suggestion__button-text">
          신청 페이지로 이동하기☞
        </div>
      </div>
    </div>
  );
};

export default Card5;
