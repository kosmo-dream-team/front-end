import axios from "axios";
import { create } from "zustand";

const useStateStore = create((set) => ({
  // 초기 통계 데이터 상태
  totalDonationAmount: 0, // 총 기부금
  totalCampaignCount: 0, // 총 캠페인 수
  totalDonationCount: 0, // 총 기부횟수
  monthlyDonationChange: [], // 월별 기부금 변화 (배열 형태)
  topDonorRanking: [], // 기부 많이 한 사람 순위 (배열 형태)
  averageDonation: 0, // 1인당 평균 기부금

  // 각각의 상태를 업데이트할 setter 함수들
  setTotalDonationAmount: (amount) => set({ totalDonationAmount: amount }),
  setTotalCampaignCount: (count) => set({ totalCampaignCount: count }),
  setTotalDonationCount: (count) => set({ totalDonationCount: count }),
  setMonthlyDonationChange: (changes) =>
    set({ monthlyDonationChange: changes }),
  setTopDonorRanking: (ranking) => set({ topDonorRanking: ranking }),
  setAverageDonation: (avg) => set({ averageDonation: avg }),

  // 한 번에 모든 통계 데이터를 업데이트하는 함수
  updateStatistics: ({
    totalDonationAmount,
    totalCampaignCount,
    totalDonationCount,
    monthlyDonationChange,
    topDonorRanking,
    averageDonation,
  }) =>
    set({
      totalDonationAmount,
      totalCampaignCount,
      totalDonationCount,
      monthlyDonationChange,
      topDonorRanking,
      averageDonation,
    }),

  // axios를 이용해 API에서 통계 데이터를 받아오는 비동기 함수
  fetchStatistics: async () => {
    try {
      // 실제 API 엔드포인트 URL로 변경해주세요.
      const response = await axios.get(
        "https://1dd58f98-d223-4b84-bafa-c09a8ab1596f.mock.pstmn.io/api/state"
      );

      // axios의 응답은 response.data에 데이터가 담겨있습니다.
      const data = response.data;
      console.log("데이터 타입", typeof data);
      console.log("데이터 배열 여부", Array.isArray(data));
      console.log(
        "response.data.totalDonationAmount",
        data.totalDonationAmount
      );
      console.log("response.data.totalCampaignCount", data.totalCampaignCount);
      console.log("response.data.totalDonationCount", data.totalDonationCount);
      console.log(
        "response.data.monthlyDonationChange",
        data.monthlyDonationChange
      );
      console.log("response.data.topDonorRanking", data.topDonorRanking);
      console.log("response.data.averageDonation", data.averageDonation);

      // JSON 응답 데이터의 키에 맞춰 상태 업데이트
      set({
        totalDonationAmount: data.totalDonationAmount,
        totalCampaignCount: data.totalCampaignCount,
        totalDonationCount: data.totalDonationCount,
        monthlyDonationChange: data.monthlyDonationChange,
        topDonorRanking: data.topDonorRanking,
        averageDonation: data.averageDonation,
      });
    } catch (error) {
      console.error("통계 데이터를 불러오는데 실패했습니다:", error);
    }
  },
}));

export default useStateStore;
