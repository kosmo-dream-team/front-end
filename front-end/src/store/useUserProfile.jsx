import axios from "axios";
import { create } from "zustand";

// 유저의 관련된 모든것을 처리하는 스토어
const useUserProfile = create((set, get) => ({
  profile: {
    user_id: null,
    user_name: null,

    password_hash: null,
    email: null,
    phone: null,
    gender: null,
    user_type: null,
    rank: null,
    total_donation_count: 0,
    profile_image: null,
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

  //프로필 수정(마이페이지)
  updateProfile: async (newProfile) => {
    set({ isLoading: true, error: null });
    try {
      const currentProfile = get().profile;
      const mergedProfile = { ...currentProfile, ...newProfile };
      // password_hash 필드 제거
      const { password_hash, ...profileWithoutPassword } = mergedProfile;
      const response = await axios.put(
        "http://localhost:8586/api/update/userProfile",
        profileWithoutPassword
      );
      set({ profile: response.data, isLoading: false });
      console.log("보낸 데이터 ", profileWithoutPassword);
      console.log("PUT API 호출 성공:", response.data);
      alert("프로필이 수정되었습니다. 다시 로그인 해주세요");
    } catch (error) {
      console.error("PUT API 호출 실패:", error);
      set({ error, isLoading: false });
    }
  },

  //프로필 이미지 설정(마이페이지)
  setProfileImage: (newImage) => {
    const currentProfile = get().profile;
    const updatedProfile = { ...currentProfile, profile_image: newImage };
    set({ profile: updatedProfile });
    console.log("프로필 이미지 업데이트:", updatedProfile);
  },

  // 로그인 시 받은 데이터를 그대로 저장
  setProfile: (newProfile) => set({ profile: newProfile }),
}));

export default useUserProfile;
