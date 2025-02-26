import DefaultUserImg from "@/assets/img/default-user-img.svg";
import axios from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";
const IMAGE_BASE_URL = "http://localhost:8586/images/";

// 쿠키에 저장된 프로필이 있다면 파싱, 없으면 기본값 사용
const initialProfile = Cookies.get("userProfile")
  ? JSON.parse(Cookies.get("userProfile"))
  : {
      user_id: null,
      user_name: null,
      password_hash: null,
      email: null,
      phone: null,
      gender: null,
      user_type: null,
      rank: null,
      total_donation_count: 0,
      profile_image: DefaultUserImg,
    };

const useUserProfile = create((set, get) => ({
  profile: initialProfile,
  isLoading: false,
  error: null,

  // 로그인 시 받은 데이터를 스토어와 쿠키에 저장
  setProfile: (newProfile) => {
    set({ profile: newProfile });
    Cookies.set("userProfile", JSON.stringify(newProfile), {
      expires: 1,
      path: "/",
    });
    console.log("프로필과 쿠키에 저장된 정보:", newProfile);
  },

  // 프로필 업데이트 시 password_hash도 포함하여 백엔드로 전송하고,
  // 응답받은 프로필의 profile_image(파일 이름)에 기본 경로를 붙여 저장
  updateProfile: async (newProfile) => {
    set({ isLoading: true, error: null });
    try {
      const currentProfile = get().profile;
      const mergedProfile = { ...currentProfile, ...newProfile };
      const formData = new FormData();

      // 필수 데이터 추가
      formData.append("user_id", mergedProfile.user_id);
      formData.append("user_name", mergedProfile.user_name);
      formData.append("password_hash", mergedProfile.password_hash);
      formData.append("email", mergedProfile.email);
      formData.append("phone", mergedProfile.phone);
      formData.append("gender", mergedProfile.gender);
      formData.append("user_type", mergedProfile.user_type || "");

      // 파일 객체인지 확인 후 추가, 아니라면 빈 문자열 전송
      if (mergedProfile.profile_image instanceof File) {
        formData.append("profile_image", mergedProfile.profile_image);
      } else {
        formData.append("profile_image", ""); // 빈 문자열을 전송 (백엔드에서 처리 필요)
      }

      console.log("보내는 데이터 (FormData):", Object.fromEntries(formData));

      // PUT 요청 전송 (multipart/form-data)
      const response = await axios.put(
        "http://localhost:8586/api/update/userProfile",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      let updatedProfile = response.data;

      // 백엔드가 파일 이름만 반환하면 full URL을 구성하여 저장
      if (
        typeof updatedProfile.profile_image === "string" &&
        updatedProfile.profile_image
      ) {
        updatedProfile.profile_image =
          IMAGE_BASE_URL + updatedProfile.profile_image;
      }

      set({ profile: updatedProfile, isLoading: false });

      // 쿠키에는 full URL이 저장되므로 이후에도 이를 그대로 사용
      Cookies.set("userProfile", JSON.stringify(updatedProfile), {
        expires: 7,
        path: "/",
      });

      console.log("PUT API 호출 성공:", updatedProfile);
      alert("프로필이 수정되었습니다. 다시 로그인 해주세요");
    } catch (error) {
      console.error("PUT API 호출 실패:", error);
      console.log("실패데이터", error.response?.data);
      set({ error, isLoading: false });
    }
  },

  // 프로필 이미지 변경 시, 파일 객체를 store에 저장합니다.
  // 단, 쿠키 업데이트는 updateProfile 호출 후(응답 데이터 기준) 진행합니다.
  setProfileImage: (newImage) => {
    const currentProfile = get().profile;
    const updatedProfile = { ...currentProfile, profile_image: newImage };
    set({ profile: updatedProfile });
    console.log("프로필 이미지 업데이트 (파일 객체 저장):", updatedProfile);
  },
}));

export default useUserProfile;
