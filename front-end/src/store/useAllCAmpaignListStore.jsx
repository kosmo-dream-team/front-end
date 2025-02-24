import axios from "axios";
import { create } from "zustand";

const useAllCampaignListStore = create((set) => ({
  campaignList: [],
  fetchCampaignList: async () => {
    try {
      const response = await axios.get("https://91553762-f2ed-40ed-aca7-ab38cf5c7bb7.mock.pstmn.io/api/category/projectlist"); 
      
      set({ campaignList: response.data });
      console.log("캠페인 리스트 전체 데이터", response.data);
      console.log("배열 여부 ", Array.isArray(response.data));
    } catch (error) {
      console.error("Error fetching campaign list:", error);
    }
  },
}));

export default useAllCampaignListStore;
