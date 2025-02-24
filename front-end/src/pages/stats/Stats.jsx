import Footer from "@/component/common/footer/Footer";
import Navbar from "@/component/common/navbar/Navbar";
import MonthlyDonationChart from "@/component/stats/MonthlyDonation"; // 월별 기부 차트 컴포넌트
import Stats from "@/component/stats/Stats"; // 통계 관련 내용을 보여주는 컴포넌트 (예시)
import "@/style/scss/style.scss";

const Stats1 = () => {
  return (
    <div className="stats-page">
      <Navbar />
      <div className="stats-container">
        {/* 통계 관련 내용 */}
        <Stats />

        {/* 월별 기부 차트 */}
        <MonthlyDonationChart />
      </div>
      <Footer />
    </div>
  );
};

export default Stats1;
