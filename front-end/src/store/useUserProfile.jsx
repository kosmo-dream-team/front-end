import axios from "axios";
import create from "zustand";

const useUserProfile = create((set) => ({
  userProfile: {
    nickname: "",
    password: "",
    email: "",
    age: "",
    sex: "",
    rank: "",
    totalDonationCount: "",
    profileImage: "",
  },
  fetchUserProfile: async () => {
    try {
      const response = await axios.get("/api/userprofile");
      set({ userProfile: response.data });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  },
  setUserProfile: (newProfile) =>
    set((state) => ({ userProfile: { ...state.userProfile, ...newProfile } })),
}));

export default useUserProfile;
