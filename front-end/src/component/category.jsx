// src/DonationBox.jsx
import React from "react";
import ".././style/scss/style.scss";

const Category = () => {
  return (
    <div className="donation-box">
      <div className="donation-box-title">
        나의 도움이 필요한 모금함은?
      </div>
      <div className="donation-box-items">
        {/* ─── 항목: 아동 ───────────────────────────── */}
        <div className="donation-box-item">
          <div className="donation-box-item-graphic">
            <div className="graphic-container">
              <div className="graphic-relative">
                <div className="graphic-layer layer1"></div>
                <div className="graphic-layer layer2"></div>
                <div className="graphic-layer layer3"></div>
                <div className="graphic-layer layer4"></div>
                <div className="graphic-layer layer5"></div>
                <div className="graphic-layer layer6"></div>
                <div className="graphic-layer layer7"></div>
                <div className="graphic-layer layer8"></div>
                <div className="graphic-layer layer9"></div>
                <div className="graphic-layer layer10"></div>
                <div className="graphic-layer layer11"></div>
                <div className="graphic-layer layer12">
                  <div className="inner-layer1"></div>
                  <div className="inner-layer2"></div>
                </div>
                <div className="graphic-layer layer13"></div>
                <div className="graphic-layer layer14"></div>
              </div>
            </div>
          </div>
          <div className="donation-box-item-label">
            <div className="donation-box-item-label-text">아동</div>
          </div>
        </div>
        {/* ─── 다른 항목들도 동일한 구조로 추가 ────────────────── */}
        <div className="donation-box-item">
          <div className="donation-box-item-graphic">
            {/* 예: 동물 항목의 그래픽 (추가 작업 필요) */}
          </div>
          <div className="donation-box-item-label">
            <div className="donation-box-item-label-text">동물</div>
          </div>
        </div>
        {/* 환경, 장애인, 지구촌, 게시판 & Tip, 마이페이지 항목도 추가 */}
      </div>
    </div>
  );
};

export default Category;
