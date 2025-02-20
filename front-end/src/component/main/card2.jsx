import "@/style/scss/style.scss";

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
              후원자님 안녕하세요? (주)안녕 병원동행
              따asdasdasdsda동입니다sdsdsdsds.1231231231231sddddd ‘아파도 병원에
              갈 수없어요’ 모금함을 향한 여러분의 따 뜻한 동참에 진심으로
              감사드립니다. 카카오같이가치 에서 많은 분들이 응원해 주시고
              모금으로 참여해주신…
            </div>
          </div>
        </div>
        <div className="review-card__right-content">
          <div className="review-card__right-title-container"></div>
          <div className="review-card__right-description-container">
            <div className="review-card__right-description"></div>
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
