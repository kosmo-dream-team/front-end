import axios from "axios";
import { create } from "zustand";

const useUserProfile = create((set, get) => ({
  profile: {
    user_name: "",
    password_hash: "",
    email: "",
    phone: "",
    gender: "",
    user_type: "",
    rank: "",
    total_donation_count: 0,
    profile_image: "",
  },
  isLoading: false,
  error: null,

  // fetchProfile: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axios.get("http://localhost:8586/api/userProfile");
  //     set({ profile: response.data, isLoading: false });
  //     console.log("GET API 호출 성공:", response.data);
  //   } catch (error) {
  //     console.error("GET API 호출 실패:", error);
  //     set({ error, isLoading: false });
  //   }
  // },

  updateProfile: async (newProfile) => {
    set({ isLoading: true, error: null });
    try {
      const currentProfile = get().profile;
      const mergedProfile = { ...currentProfile, ...newProfile };
      const response = await axios.put(
        // "http://localhost:8586/api/update/userProfile",
        "https://5a444086-c1dc-4892-ad18-bdd46c7aef5f.mock.pstmn.io/api/update/userProfile",
        mergedProfile
      );
      set({ profile: response.data, isLoading: false });
      console.log("PUT API 호출 성공:", response.data);
      console.log(response.data);
    } catch (error) {
      console.error("PUT API 호출 실패:", error);
      set({ error, isLoading: false });
    }
  },

  setProfileImage: async (newImage) => {
    set({ isLoading: true, error: null });
    try {
      const currentProfile = get().profile;
      const updatedProfile = { ...currentProfile, profile_image: newImage };
      const response = await axios.put(
        // "http://localhost:8586/api/update/userImage",
        "https://5a444086-c1dc-4892-ad18-bdd46c7aef5f.mock.pstmn.io/api/update/profile_image",
        updatedProfile
      );
      set({ profile: response.data, isLoading: false });
      console.log("프로필 이미지 업데이트 성공:", response.data);
    } catch (error) {
      console.error("프로필 이미지 업데이트 실패:", error);
      set({ error, isLoading: false });
    }
  },

  // 새로 추가한 함수: 로그인 시 받은 데이터를 그대로 저장
  setProfile: (newProfile) => set({ profile: newProfile }),
}));

export default useUserProfile;
