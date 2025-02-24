import Cookies from "js-cookie";
import { create } from "zustand";

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
      profile_image: null,
    };

const useUserProfile = create((set, get) => ({
  profile: initialProfile,
  isLoading: false,
  error: null,

  // 로그인 시 받은 데이터를 스토어와 쿠키에 저장
  setProfile: (newProfile) => {
    set({ profile: newProfile });
    Cookies.set("userProfile", JSON.stringify(newProfile), {
      expires: 7,
      path: "/",
    });
    console.log("프로필과 쿠키에 저장된 정보:", newProfile);
  },

  // 프로필 업데이트 시에도 쿠키에 반영
  updateProfile: async (newProfile) => {
    set({ isLoading: true, error: null });
    try {
      const currentProfile = get().profile;
      const mergedProfile = { ...currentProfile, ...newProfile };
      const { password_hash, ...profileWithoutPassword } = mergedProfile;

      let response;
      if (profileWithoutPassword.profile_image instanceof File) {
        const formData = new FormData();
        formData.append("user_id", profileWithoutPassword.user_id);
        formData.append("user_name", profileWithoutPassword.user_name);
        formData.append("phone", profileWithoutPassword.phone);
        formData.append("email", profileWithoutPassword.email);
        formData.append("gender", profileWithoutPassword.gender);
        formData.append("user_type", profileWithoutPassword.user_type || "");
        formData.append("profileImage", profileWithoutPassword.profile_image);

        response = await axios.put(
          "http://localhost:8586/api/update/userProfile",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.put(
          "http://localhost:8586/api/update/userProfile",
          profileWithoutPassword
        );
      }
      set({ profile: response.data, isLoading: false });
      // 업데이트된 정보를 쿠키에도 저장
      Cookies.set("userProfile", JSON.stringify(response.data), {
        expires: 7,
        path: "/",
      });
      console.log("PUT API 호출 성공:", response.data);
      alert("프로필이 수정되었습니다. 다시 로그인 해주세요");
    } catch (error) {
      console.error("PUT API 호출 실패:", error);
      set({ error, isLoading: false });
    }
  },

  setProfileImage: (newImage) => {
    const currentProfile = get().profile;
    const updatedProfile = { ...currentProfile, profile_image: newImage };
    set({ profile: updatedProfile });
    // 쿠키도 함께 업데이트
    Cookies.set("userProfile", JSON.stringify(updatedProfile), {
      expires: 7,
      path: "/",
    });
    console.log("프로필 이미지 업데이트:", updatedProfile);
  },
}));

export default useUserProfile;
