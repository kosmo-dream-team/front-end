import Card1 from "@/assets/img/Card1.png";
import "@/style/scss/style.scss";

const Stats = () => {
  return (
    <div className="donation-stats">
      <img className="donation-img" src={Card1} />
      <h1>기부 통계</h1>

      <div className="stats-container">
        <div className="stat-item">
          <h2>총 기부금</h2>
          <p>157억</p>
        </div>
        <div className="stat-item">
          <h2>캠페인 수</h2>
          <p>15795개</p>
        </div>
        <div className="stat-item">
          <h2>기부 횟수</h2>
          <p>1597835건</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
