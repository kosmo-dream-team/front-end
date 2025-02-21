import "@/style/scss/style.scss";

const Card1 = () => {
  return (
    <div className="card">
      <div className="card-title-container">
        <div className="card-title">
          우리가 함께 만든
          <br />
          아름다운 변화들
        </div>
      </div>
      <div className="card-date-container">
        <div className="card-date">2025.01.22 기준</div>
      </div>
      <div className="card-donation">
        <img
          className="donation-icon"
          src="https://via.placeholder.com/18x18"
          alt="donation icon"
        />
        <div className="donation-text">총 기부금</div>
        <div className="donation-amount-container">
          <div className="donation-amount">79,329,259,909원</div>
        </div>
      </div>
      <img
        className="card-image"
        src="https://via.placeholder.com/105x133"
        alt="card illustration"
      />
    </div>
  );
};

export default Card1;
