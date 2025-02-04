import React from 'react';
import ".././style/scss/style.scss";

const Card2 = () => {
  return (
    <div className="review-card">
      <div className="review-card__header">따뜻한 후기</div>
      <div className="review-card__content-container">
        <div className="review-card__left-content">
          <div className="review-card__left-title-container">
            <div className="review-card__left-title">
              이동이 어려운 저소득층과 함께한 따뜻한
              <br />
              병원 동행
            </div>
          </div>
          <div className="review-card__left-description-container">
            <div className="review-card__left-description">
              후원자님 안녕하세요? (주)안녕 병원동행 따동입니다.
              <br />
              ‘아파도 병원에 갈 수없어요’ 모금함을 향한 여러분의 따
              <br />
              뜻한 동참에 진심으로 감사드립니다. '카카오같이가치'
              <br />
              에서 많은 분들이 응원해 주시고 모금으로 참여해주신…
            </div>
          </div>
        </div>
        <div className="review-card__right-content">
          <div className="review-card__right-title-container">
            <div className="review-card__right-title">
              긴 터널의 끝, 빛이 보여요.
            </div>
          </div>
          <div className="review-card__right-description-container">
            <div className="review-card__right-description">
              선우의 엄마는 어릴 적 교통사고로 인한 우측 편마비로
              <br />
              일상생활은 물론, 선우 돌봄과 근로활동에 큰 어려움이
              <br />
              있었습니다. 엄마는 힘든 상황에서도 선우에게 좋은 엄
              <br />
              마가 되기 위해 양육자의 역할을 공부하고 일자리를 알
              <br />
              아보는 등 꾸준히 노력해 왔습니다. 하지만 2인 기준 
            </div>
          </div>
        </div>
      </div>
      <div className="review-card__dots-container">
        <div className="review-card__dot inactive">
          <div className="review-card__dot-inner" />
        </div>
        <div className="review-card__dot active">
          <div className="review-card__dot-inner" />
        </div>
        <div className="review-card__dot inactive">
          <div className="review-card__dot-inner" />
        </div>
      </div>
    </div>
  );
};

export default Card2;
