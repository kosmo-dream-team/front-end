import { create } from "zustand";

// 캠페인 상세보기 페이지에서 사용되는 데이터들
const useCampaignStore = create((set) => ({
  toggleMenu: {
    menuList: [
      { name: "소개", url: "/campaign/intro" },
      { name: "나눔내역", url: "/campaign/history" },
      { name: "소식", url: "/campaign/news" },
    ],
  },
  campaignStatus: {
    title: null,
    category: null,
    startDate: null,
    endDate: null,
    description: null,
    daysLeft: null,
    targetAmount: null,
    donationRate: null,
    donors: [],
    donorCount: null,
    accumulatedDonation: null,
    projectImage: null,
    likeCount: null,
    // shareCount: null,
    // categoryList: [
    //   {name: '국내'}, // 임시 데이터
    //   {name: '치료비'}
    // ],
    // donorList: [
    //   {userName: '축복덩어리', profileImg: '/src/assets/img/like.png'}, // 임시 데이터
    //   {userName: '숨은천사', profileImg: '/src/assets/img/like.png'}
    // ],
    // commentList: [
    //   {profileImg: '/src/assets/img/like.png', userName: '축복덩어리', comment: '응원합니다.', likeCount: 0, postDate: '2025.01.23'}, // 임시 데이터
    //   {profileImg: '/src/assets/img/like.png', userName: '숨은천사', comment: '우리 함께 합시다!', likeCount: 1, postDate: '2025.01.22'}
    // ]
  },
  fetchCampaignStatus: async () => {
    try {
      console.log("Fetching campaign status...");
      await fetch("http://192.168.0.53:8586/project/10", {
        withCredentials: true,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          set({ campaignStatus: res });
        });
    } catch (error) {
      console.error("캠페인 api 가져오기 오류 발생", error);
    }
  },
  setCampaignStatus: (newStatus) =>
    set((state) => ({
      campaignStatus: { ...state.campaignStatus, ...newStatus },
    })),
}));

export default useCampaignStore;
