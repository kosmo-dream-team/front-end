
import { create } from 'zustand';

export const useDonationStore = create((set) => ({
  // 프론트에서 사용자가 입력하는 데이터
  donationData: {
    categoryId: null,        // 사용자가 선택한 카테고리 ID
    title: '',               // 프로젝트 제목
    description: '',         // 상세 내용
    targetAmount: 0,         // 목표 금액 (숫자)
    end_date: '',            // 종료 일자 (날짜 문자열)
    project_image: '',       // 첨부 이미지 경로 또는 URL
    status: 'pending',       // 기본 상태 (백엔드 기준)
    // userId는 로그인된 사용자 정보에서 설정 (필요 시)
  },
  setDonationData: (data) =>
    set((state) => ({ donationData: { ...state.donationData, ...data } })),
  resetDonationData: () =>
    set(() => ({
      donationData: {
        categoryId: null,
        title: '',
        description: '',
        targetAmount: 0,
        end_date: '',
        project_image: '',
        status: 'pending',
      },
    })),
}));
