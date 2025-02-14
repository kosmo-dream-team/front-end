// store/useUserProfile.js
import axios from "axios";
import { create } from "zustand";

//실제 api 호출할 경우 이 부분을 주석처리.
//==============================================================================
import MockAdapter from "axios-mock-adapter";

// 테스트용 더미데이터 설정
const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onGet("http://localhost:8586/api/userProfile").reply(200, {
  name: "홍길동",
  password: "12345678910",
  phone: "010123123123",
  email: "orm123123@gmaul.com",
  age: "1980-01-01",
  gender: "남성",
  rank: "골드",
  totalDonationCount: "1004",
  img: "https://i.namu.wiki/i/VrVvnKwZ-OR_dqWJfiQQZoOgnTmAQeZ_QTyDCPa3KDhF4V_oaHr4nIbVEebqDZYj5GJH75ft1UKfU9PMaqh93w.webp",
});

mock.onPut("http://localhost:8586/api/userProfile").reply((config) => {
  const updatedProfile = JSON.parse(config.data);
  return [200, updatedProfile];
});
//==============================================================================

// Zustand 스토어 생성
const useUserProfile = create((set, get) => ({
  profile: {
    name: "",
    password: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    rank: "",
    totalDonationCount: "",
    img: "",
  },
  isLoading: false,
  error: null,

  // 프로필 데이터 가져오기
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("http://localhost:8586/api/userProfile");
      set({ profile: response.data, isLoading: false });
      console.log("API 호출 성공:", response.data);
    } catch (error) {
      console.error("API 호출 실패:", error);
      set({ error, isLoading: false });
    }
  },

  // 프로필 업데이트 (전체 데이터 업데이트)
  updateProfile: async (newProfile) => {
    set({ isLoading: true, error: null });
    try {
      const currentProfile = get().profile;
      const mergedProfile = { ...currentProfile, ...newProfile };
      const response = await axios.put(
        "http://localhost:8586/api/userProfile",
        mergedProfile
      );
      set({ profile: response.data, isLoading: false });
      console.log("프로필 업데이트 성공:", response.data);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      set({ error, isLoading: false });
    }
  },

  // 프로필 이미지 업데이트(별도 API 요청)
  setProfileImage: async (newImage) => {
    set({ isLoading: true, error: null });
    try {
      const currentProfile = get().profile;
      const updatedProfile = { ...currentProfile, img: newImage };
      const response = await axios.put(
        "http://localhost:8586/api/userProfile",
        updatedProfile
      );
      set({ profile: response.data, isLoading: false });
      console.log("프로필 이미지 업데이트 성공:", response.data);
    } catch (error) {
      console.error("프로필 이미지 업데이트 실패:", error);
      set({ error, isLoading: false });
    }
  },
}));

export default useUserProfile;
