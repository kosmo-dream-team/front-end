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
    projectId: null,
    projectImage: null,
    applicant: null,
    title: null,
    description: null,
    // categoryList: [
    //   {categoryName: '국내'}
    // ],
    categoryList: [],
    startDate: null,
    endDate: null,
    daysLeft: null,
    accumulatedDonation: null,
    targetAmount: null,
    donationRate: null,
    likeCount: null,
    shareCount: null,
    donorCount: null,
    // donorList: [
    //   {donorName: '축복덩어리', profileImage: '/src/assets/img/like.png'}
    // ],
    donorList: [],
    // commentList: [
    //   {userName: '축복덩어리', comment: '응원합니다.', likeCount: 0, postDate: '2025.01.23', profileImage: '/src/assets/img/like.png'}
    // ]
    commentList: [],
  },
  fetchCampaignStatus: async (campaignId) => {
    try {
      await fetch("http://localhost:8586/project/" + campaignId, {
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
  writeComment: async (campaignId, userId, comment) => {
    console.log(
      JSON.stringify({
        campaignId: campaignId,
        userId: userId,
        comment: comment,
      })
    );
    try {
      await fetch("http://localhost:8586/comment/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: campaignId,
          userId: userId,
          comment: comment,
        }),
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.error("댓글 작성하기 api 오류 발생", error);
    }
  },
  donateCampaign: async (campaignId, userId, amount, paymentMethod) => {
    try {
      const data = {
        userId: userId,
        amount: amount,
        paymentMethod: paymentMethod,
      };

      await fetch(`http://localhost:8586/project/${campaignId}/donate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        console.log(res);
        alert("기부가 완료되었습니다!\n감사합니다!");
        window.location.reload();
      });
    } catch (error) {
      console.error("기부 내역 저장하기 api 오류 발생", error);
    }
  },
}));

export default useCampaignStore;
