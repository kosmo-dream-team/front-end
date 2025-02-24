// MonthlyDonationChart.jsx
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useStateStore from "../../store/useStateStore";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const MonthlyDonationChart = () => {
  // zustand 스토어에서 monthlyDonationChange와 fetchStatistics를 불러옵니다.
  const { monthlyDonationChange, fetchStatistics } = useStateStore();
  const [chartData, setChartData] = useState(null);

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  // monthlyDonationChange가 업데이트 될 때 차트 데이터를 생성합니다.
  useEffect(() => {
    if (monthlyDonationChange && monthlyDonationChange.length > 0) {
      const labels = monthlyDonationChange.map((item) => item.year);
      const donations = monthlyDonationChange.map((item) => item.donation);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "월별 기부금 (원)",
            data: donations,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.6)",
            borderColor: "rgba(75,192,192,1)",
            tension: 0.3,
          },
        ],
      });
    }
  }, [monthlyDonationChange]);

  return (
    <div className="stats-chart">
      <h2 className="stats-chart-title">월별 기부금 변화</h2>
      {chartData ? <Line data={chartData} /> : <p>데이터 로딩 중...</p>}
    </div>
  );
};

export default MonthlyDonationChart;
