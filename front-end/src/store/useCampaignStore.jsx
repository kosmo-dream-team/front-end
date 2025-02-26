import { create } from "zustand";

const IMAGE_BASE_URL = "http://localhost:8586/images/";
// 지원할 이미지 확장자 목록
const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

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
    donorList: [],
    commentList: [],
  },
  fetchCampaignStatus: async (campaignId) => {
    console.log("API 호출 시작:", campaignId);
    try {
      await fetch("http://localhost:8586/project/" + campaignId, {
        withCredentials: true,
      })
        .then((res) => res.json())
        .then((res) => {
          // projectImage 처리: 문자열이며 지원 확장자로 끝나고 full URL이 아닐 경우 IMAGE_BASE_URL 추가
          if (
            typeof res.projectImage === "string" &&
            supportedExtensions.some((ext) =>
              res.projectImage.toLowerCase().endsWith(ext)
            ) &&
            !res.projectImage.startsWith("http")
          ) {
            res.projectImage = IMAGE_BASE_URL + res.projectImage;
          }

          // donorList 내 각 donor의 profileImage 처리
          if (Array.isArray(res.donorList)) {
            res.donorList = res.donorList.map((donor) => {
              if (
                donor.profileImage &&
                typeof donor.profileImage === "string" &&
                supportedExtensions.some((ext) =>
                  donor.profileImage.toLowerCase().endsWith(ext)
                ) &&
                !donor.profileImage.startsWith("http")
              ) {
                donor.profileImage = IMAGE_BASE_URL + donor.profileImage;
              }
              return donor;
            });
          }
          console.log("캠페인 상태 가져오기 성공:", res);
          set({ campaignStatus: res });
        });
    } catch (error) {
      console.error("캠페인 API 가져오기 오류 발생", error);
    }
  },
  setCampaignStatus: (newStatus) => {
    console.log("새 캠페인 상태 설정:", newStatus);
    set((state) => ({
      campaignStatus: { ...state.campaignStatus, ...newStatus },
    }));
  },
  writeComment: async (campaignId, userId, comment) => {
    console.log("댓글 작성:", { campaignId, userId, comment });
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
        console.log("댓글 작성 응답:", res);
        alert("댓글 작성이 완료되었습니다.");
        window.location.reload();
      });
    } catch (error) {
      console.error("댓글 작성하기 API 오류 발생", error);
    }
  },
  donateCampaign: async (campaignId, userId, amount, paymentMethod) => {
    console.log("캠페인 기부:", {
      campaignId,
      userId,
      amount,
      paymentMethod,
    });
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
        console.log("기부 응답:", res);
        alert("기부가 완료되었습니다!\n감사합니다!");
        window.location.reload();
      });
    } catch (error) {
      console.error("기부 내역 저장하기 API 오류 발생", error);
    }
  },
  likeCampaign: async (campaignId) => {
    console.log("캠페인 좋아요:", campaignId);
    try {
      await fetch(`http://localhost:8586/project/${campaignId}/like`, {
        withCredentials: true,
      }).then((res) => {
        console.log("좋아요 응답:", res);
        window.location.reload();
      });
    } catch (error) {
      console.error("좋아요 API 오류 발생", error);
    }
  },
  shareCampaign: async (campaignId) => {
    console.log("캠페인 공유:", campaignId);
    try {
      await fetch(`http://localhost:8586/project/${campaignId}/share`, {
        withCredentials: true,
      }).then((res) => {
        console.log("공유 응답:", res);
        window.location.reload();
      });
    } catch (error) {
      console.error("캠페인 공유 API 오류 발생", error);
    }
  },
  likeComment: async (commentId) => {
    console.log("댓글 좋아요:", commentId);
    try {
      await fetch(`http://localhost:8586/project/likeComment/${commentId}`, {
        withCredentials: true,
      }).then((res) => {
        console.log("댓글 좋아요 응답:", res);
        window.location.reload();
      });
    } catch (error) {
      console.error("댓글 좋아요 API 오류 발생", error);
    }
  },
}));

export default useCampaignStore;
