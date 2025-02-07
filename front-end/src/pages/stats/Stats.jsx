
import Navbar from "../../component/common/navbar/Navbar";
import Stats from "../../component/stats/Stats"; // 통계 관련 내용을 보여주는 컴포넌트 (예시)
import MonthlyDonationChart from "../../component/stats/MonthlyDonation"; // 월별 기부 차트 컴포넌트
import "../../style/scss/style.scss";
import { BrowserRouter } from 'react-router-dom';

const Stats1 = () => {
  return (
    <BrowserRouter>
    <div className="stats-page">
      <Navbar />
      <div className="stats-container">
        {/* 통계 관련 내용 */}
        <Stats />
    
        {/* 월별 기부 차트 */}
        <MonthlyDonationChart />
      </div>
    </div>
      </BrowserRouter>);
      
};

export default Stats1;
