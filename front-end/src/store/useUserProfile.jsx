import axios from "axios";
import { create } from "zustand";

// 실제 API 호출 시, 아래 모킹 부분을 주석 처리하세요.
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet(/\/api\/userProfile\/?$/).reply(200, {
  name: "홍길23동",
  password: "12345678910",
  phone: "010123123123",
  email: "orm123123@gmaul.com",
  age: "1980-01-01",
  gender: "남성",
  rank: "골드",
  totalDonationCount: "1004",
  img: "https://i.namu.wiki/i/VrVvnKwZ-OR_dqWJfiQQZoOgnTmAQeZ_QTyDCPa3KDhF4V_oaHr4nIbVEebqDZYj5GJH75ft1UKfU9PMaqh93w.webp",
});

mock.onPut(/\/api\/userProfile\/?$/).reply((config) => {
  const updatedProfile = JSON.parse(config.data);
  return [200, updatedProfile];
});

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

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("http://localhost:8586/api/userProfile");
      set({ profile: response.data, isLoading: false });
      console.log("GET API 호출 성공:", response.data);
    } catch (error) {
      console.error("GET API 호출 실패:", error);
      set({ error, isLoading: false });
    }
  },

  updateProfile: async (newProfile) => {
    set({ isLoading: true, error: null });
    try {
      const currentProfile = get().profile;
      const mergedProfile = { ...currentProfile, ...newProfile };
      const response = await axios.put("http://localhost:8586/api/userProfile", mergedProfile);
      set({ profile: response.data, isLoading: false });
      console.log("PUT API 호출 성공:", response.data);
    } catch (error) {
      console.error("PUT API 호출 실패:", error);
      set({ error, isLoading: false });
    }
  },

  setProfileImage: async (newImage) => {
    set({ isLoading: true, error: null });
    try {
      const currentProfile = get().profile;
      const updatedProfile = { ...currentProfile, img: newImage };
      const response = await axios.put("http://localhost:8586/api/userProfile", updatedProfile);
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
