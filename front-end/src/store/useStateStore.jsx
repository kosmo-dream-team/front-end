import axios from "axios";
import { create } from "zustand";

// 통계 상태관리
const useStateStore = create((set) => ({
  totalDonationAmount: 0, // 총 기부금
  totalCampaignCount: 0, // 총 캠페인 수
  totalDonationCount: 0, // 총 기부횟수
  monthlyDonationChange: [], // 월별 기부금 변화
  topDonorRanking: [], // 기부 많이 한 사람 순위
  averageDonation: 0, // 1인당 평균 기부금

  //세터함수
  setTotalDonationAmount: (amount) => set({ totalDonationAmount: amount }),
  setTotalCampaignCount: (count) => set({ totalCampaignCount: count }),
  setTotalDonationCount: (count) => set({ totalDonationCount: count }),
  setMonthlyDonationChange: (changes) =>
    set({ monthlyDonationChange: changes }),
  setTopDonorRanking: (ranking) => set({ topDonorRanking: ranking }),
  setAverageDonation: (avg) => set({ averageDonation: avg }),

  // 모든 통계업뎃
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

  // 통계 데이터 받기
  fetchStatistics: async () => {
    try {
      // 실제 API 엔드포인트 URL로 변경해주세요.
      const response = await axios.get(
        "https://1dd58f98-d223-4b84-bafa-c09a8ab1596f.mock.pstmn.io/api/state"
      );

      const data = response.data;
      console.log("데이터 타입", typeof data);
      console.log("데이터 배열인지", Array.isArray(data));
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

      // 통계 키에 업데이트
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
