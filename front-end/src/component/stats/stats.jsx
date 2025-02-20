import Card1 from "@/assets/img/Card1.png";
import "@/style/scss/style.scss";
import useStateStore from "../../store/useStateStore";

const Stats = () => {
  // zustand 스토어에서 상태와 함수를 불러옴
  const { totalDonationAmount, totalCampaignCount, totalDonationCount } =
    useStateStore();

  return (
    <div className="donation-stats">
      <img className="donation-img" src={Card1} alt="Card" />
      <h1>기부 통계</h1>

      <div className="stats-container">
        <div className="stat-item">
          <h2>총 기부금</h2>
          <p>{totalDonationAmount}</p>
        </div>
        <div className="stat-item">
          <h2>캠페인 수</h2>
          <p>{totalCampaignCount}</p>
        </div>
        <div className="stat-item">
          <h2>기부 횟수</h2>
          <p>{totalDonationCount}</p>
        </div>
      </div>
      <div className="stats-container"></div>
    </div>
  );
};

export default Stats;
