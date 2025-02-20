import arrowRight from "@/assets/img/arrow-right.svg";
import "@/style/scss/style.scss";
const Card3 = () => {
  return (
    <div className="campaign-section">
      {/* 헤더 영역: 제목 + 전체보기 */}
      <div className="campaign-section__header">
        <div className="campaign-section__title">새로운 캠페인이에요</div>
        <div className="campaign-section__view-all">
          <div className="campaign-section__view-all-text">전체보기</div>

          <img src={arrowRight} alt="" />
        </div>
      </div>

      {/* 슬라이더 영역 */}
      <div className="campaign-section__slider">
        <div className="campaign-slider-container">
          <div className="campaign-slider__track">
            {/* 좌측 여백(스페이서) */}
            <div className="campaign-slider__spacer" />

            {/* 캠페인 아이템들 */}
            <div className="campaign-items">
              {/* 캠페인 아이템 1 */}
              <div className="campaign-item">
                <img
                  className="campaign-item__image"
                  src="https://via.placeholder.com/114x83"
                  alt="Campaign 1"
                />
                <div className="campaign-item__details">
                  <div className="campaign-item__title">
                    병원비 걱정없이 치료받고 싶어요.
                  </div>
                  <div className="campaign-item__sponsor">
                    한국백혈병어린이재단
                  </div>
                  <div className="campaign-item__progress-bg">
                    <div
                      className="campaign-item__progress-bar"
                      style={{ width: "46.75px" }}
                    />
                  </div>
                  <div className="new-campaign-item">
                    <div className="campaign-item__donation-percent">28%</div>
                    <div className="campaign-item__donation-amount">
                      <span>1,140,000원</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 캠페인 아이템 2 */}
              <div className="campaign-item">
                <img
                  className="campaign-item__image"
                  src="https://via.placeholder.com/114x83"
                  alt="Campaign 2"
                />
                <div className="campaign-item__details">
                  <div className="campaign-item__title">
                    1년간 준비해온 아이들의 발표회를 지원해주세요
                  </div>
                  <div className="campaign-item__sponsor">양지지역아동센터</div>
                  <div className="campaign-item__progress-bg" />
                  <div className="new-campaign-item">
                    <div className="campaign-item__donation-percent">28%</div>
                    <div className="campaign-item__donation-amount">
                      <span>1,140,000원</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 캠페인 아이템 3 */}
              <div className="campaign-item">
                <img
                  className="campaign-item__image"
                  src="https://via.placeholder.com/114x83"
                  alt="Campaign 3"
                />
                <div className="campaign-item__details">
                  <div className="campaign-item__title">
                    사각지대 맞춤 돌봄 서비스
                  </div>
                  <div className="campaign-item__sponsor">
                    서대문한마음돌봄 사회적협
                  </div>
                  <div className="campaign-item__progress-bg">
                    <div
                      className="campaign-item__progress-bar short"
                      style={{ width: "3.33px" }}
                    />
                  </div>
                  <div className="new-campaign-item">
                    <div className="campaign-item__donation-percent">28%</div>
                    <div className="campaign-item__donation-amount">
                      <span>1,140,000원</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 우측 여백(스페이서) – 3개 */}
            <div className="campaign-slider__spacer" />
            <div className="campaign-slider__spacer" />
            <div className="campaign-slider__spacer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card3;
