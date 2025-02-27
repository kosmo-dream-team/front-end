import { useEffect, useState } from "react";
import useUserProfile from "../../store/useUserProfile";
import "../../style/scss/style.scss";

export default function ProfileEditForm() {
  const { profile, updateProfile, isLoading, error } = useUserProfile();

  // 편집 여부 관리 (비밀번호 관련 속성 제거)
  const [editing, setEditing] = useState({
    user_name: false,
    phone: false,
    email: false,
    gender: false,
  });

  // 폼 데이터 관리 (비밀번호 관련 필드 제거)
  const [formData, setFormData] = useState({
    user_id: "",
    user_name: "",
    phone: "",
    email: "",
    gender: "",
  });

  // store의 profile 데이터를 불러와 상태 초기화
  useEffect(() => {
    if (profile && profile.user_name) {
      setFormData({
        user_id: profile.user_id || "",
        user_name: profile.user_name || "",
        phone: profile.phone || "",
        email: profile.email || "",
        gender: profile.gender || "",
      });
    }
  }, [profile]);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터를 불러오는 중 오류 발생: {error.message}</p>;

  // 입력값 변경 핸들러
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 편집 토글 핸들러
  const handleEditToggle = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // 저장하기 버튼 클릭 시 업데이트
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);

    // 저장 후 편집모드 비활성화
    setEditing({
      user_name: false,
      phone: false,
      email: false,
      gender: false,
    });

    window.onload();
  };

  return (
    <form onSubmit={handleSubmit} className="mypage-myinfo__root-container">
      {/* 이름 */}
      <div className="mypage-myinfo__container">
        <div className="mypage-myinfo__list-wrapper">
          <p className="myinfo-title">이름</p>
          <input
            className="myinfo-value"
            type="text"
            value={formData.user_name}
            readOnly={!editing.user_name}
            onChange={(e) => handleChange("user_name", e.target.value)}
          />
          <button
            type="button"
            className="myinfo-edit"
            onClick={() => handleEditToggle("user_name")}
          >
            변경
          </button>
        </div>
      </div>
      <div className="border--dotted" />

      {/* 연락처 */}
      <div className="mypage-myinfo__container">
        <div className="mypage-myinfo__list-wrapper">
          <p className="myinfo-title">연락처</p>
          <input
            className="myinfo-value"
            type="tel"
            value={formData.phone}
            readOnly={!editing.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <button
            type="button"
            className="myinfo-edit"
            onClick={() => handleEditToggle("phone")}
          >
            변경
          </button>
        </div>
      </div>
      <div className="border--dotted" />

      {/* 이메일 */}
      <div className="mypage-myinfo__container">
        <div className="mypage-myinfo__list-wrapper">
          <p className="myinfo-title">이메일</p>
          <input
            className="myinfo-value"
            type="email"
            value={formData.email}
            readOnly={!editing.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <button
            type="button"
            className="myinfo-edit"
            onClick={() => handleEditToggle("email")}
          >
            변경
          </button>
        </div>
      </div>
      <div className="border--dotted" />

      {/* 성별 */}
      <div className="mypage-myinfo__container">
        <div className="mypage-myinfo__list-wrapper">
          <p className="myinfo-title">성별</p>
          <select
            name="gender"
            id="gender"
            className="myinfo-value"
            value={formData.gender}
            disabled={!editing.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">선택</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="선택안함">선택안함</option>
          </select>
          <button
            type="button"
            className="myinfo-edit"
            onClick={() => handleEditToggle("gender")}
          >
            변경
          </button>
        </div>
      </div>
      <div className="border--dotted" />

      {/* 저장하기 버튼 */}
      <div className="mypage-myinfo__container">
        <div className="mypage-myinfo__list-wrapper">
          <button type="submit" className="myinfo-edit-submit">
            저장하기
          </button>
        </div>
      </div>
    </form>
  );
}
