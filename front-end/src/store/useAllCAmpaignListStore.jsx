import axios from "axios";
import { create } from "zustand";

const IMAGE_BASE_URL = "http://localhost:8586/images/";

// 지원할 이미지 확장자 목록
const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

const useAllCampaignListStore = create((set) => ({
  campaignList: [],
  fetchCampaignList: async () => {
    try {
      const response = await axios.get(
        "http://localhost:8586/project/allprojectlist"
      );

      const processedCampaigns = response.data.map((campaign) => {
        // project_image가 문자열이며, 지원하는 확장자로 끝나고 full URL이 아니라면 기본 경로 추가
        if (
          typeof campaign.project_image === "string" &&
          supportedExtensions.some((ext) =>
            campaign.project_image.toLowerCase().endsWith(ext)
          ) &&
          !campaign.project_image.startsWith("http")
        ) {
          campaign.project_image = IMAGE_BASE_URL + campaign.project_image;
        }
        return campaign;
      });

      set({ campaignList: processedCampaigns });
      // console.log("캠페인 리스트 전체 데이터", processedCampaigns);
    } catch (error) {
      console.error("Error fetching campaign list:", error);
    }
  },
}));

export default useAllCampaignListStore;
