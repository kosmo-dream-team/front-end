import "@/style/scss/style.scss";

const Card2 = () => {
  return (
    <div className="card">
      {/* 제목 */}
      <div className="card__title">치료 후에도 집에 갈 수 없는 해영이</div>

      {/* 진행률(%) */}
      <div className="card__percent">42%</div>

      {/* D-Day */}
      <div className="card__d-day">D-5</div>

      {/* 모금액 */}
      <div className="card__donation">
        <span className="card__donation-amount">904,260</span>
        <span className="card__donation-currency">원</span>
      </div>

      {/* 목표액 */}
      <div className="card__goal">
        2,165,00000000000000
        <br />원 목표
      </div>

      {/* 진행바 */}
      <div className="card__progress">
        <div className="card__progress-bar" />
      </div>

      {/* 정보 섹션 */}
      <div className="card__info">
        {/* 세제 혜택 안내 */}
        <div className="card__info-item card__info-item--tax">
          <div className="card__info-link">세제 혜택 안내</div>
        </div>

        <div className="card__info-section">
          <div className="card__info-row" style={{ top: 0 }}>
            <div className="card__bullet" />
            <div className="card__info-text">일반기부금</div>
          </div>
          <div className="card__info-row" style={{ top: 9 }}>
            <div className="card__bullet" />
            <div className="card__info-text">모금 전달 안내</div>
          </div>
          <div className="card__info-row" style={{ top: 18 }}>
            <div className="card__bullet" />
            <div className="card__info-text">2025년 연말정산 대상</div>
          </div>
        </div>

        {/* 모금 전달 안내 */}

        <div className="card__info-item card__info-item--transfer"></div>

        <div className="card__info-row" style={{ top: 127 }}>
          <div className="card__bullet" />
          <div className="card__info-text">모금 종료시 전액 일시 전달</div>
        </div>
      </div>

      {/* 기부하기 버튼 */}
      <div className="card__donate-button">
        <div className="card__donate-text">기부하기</div>
      </div>
    </div>
  );
};

export default Card2;
