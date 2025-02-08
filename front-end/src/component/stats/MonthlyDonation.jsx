import { useState, useEffect } from 'react';
// import axios from 'axios';
import { Line } from 'react-chartjs-2';
// Chart.js 관련 import와 설정 (필요한 경우)
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const MonthlyDonationChart = () => {
  const [chartData, setChartData] = useState("");

  useEffect(() => {
    // 백엔드가 준비되지 않았으므로, axios를 통한 API 요청 부분은 주석 처리합니다.
    /*
    axios.get('http://localhost:8080/api/donations/monthly')
      .then(response => {
        const data = response.data;
        const labels = data.map(item => item.month);
        const donations = data.map(item => item.donation);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: '월별 기부금 (만원)',
              data: donations,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.6)',
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.3,
            },
          ],
        });
      })
      .catch(error => {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      });
    */

    // 백엔드 없이 하드코딩된 예시 데이터 사용
    const data = [
      { month: '1월', donation: 100 },
      { month: '2월', donation: 150 },
      { month: '3월', donation: 200 },
      { month: '4월', donation: 170 },
      { month: '5월', donation: 220 },
      { month: '6월', donation: 180 },
      { month: '7월', donation: 210 },
      { month: '8월', donation: 230 },
      { month: '9월', donation: 190 },
      { month: '10월', donation: 250 },
      { month: '11월', donation: 300 },
      { month: '12월', donation: 280 },
    ];

    const labels = data.map(item => item.month);
    const donations = data.map(item => item.donation);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: '월별 기부금 (만원)',
          data: donations,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.3,
        },
      ],
    });
  }, []);

  return (
    <div>
      <h2>월별 기부금 변화</h2>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>데이터 로딩 중...</p>
      )}
    </div>
  );
};

export default MonthlyDonationChart;
