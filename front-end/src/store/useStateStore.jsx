// src/stores/useStatisticsStore.jsx
import { create } from "zustand";

const useStatisticsStore = create((set) => ({
  // 초기값 설정
  totalDonationAmount: 0, // 총 기부금
  totalCampaignCount: 0, // 총 캠페인 수
  totalDonationCount: 0, // 총 기부횟수

  // 각각의 상태를 업데이트할 setter 함수들
  setTotalDonationAmount: (amount) => set({ totalDonationAmount: amount }),
  setTotalCampaignCount: (count) => set({ totalCampaignCount: count }),
  setTotalDonationCount: (count) => set({ totalDonationCount: count }),

  // 한번에 모든 통계 데이터를 업데이트하는 함수 (옵션)
  updateStatistics: ({ amount, campaigns, donations }) =>
    set({
      totalDonationAmount: amount,
      totalCampaignCount: campaigns,
      totalDonationCount: donations,
    }),
}));

export default useStatisticsStore;
