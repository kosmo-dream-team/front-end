import { useEffect, useState } from "react";
import useUserProfile from "../../store/useUserProfile";
import "../../style/scss/style.scss";

export default function ProfileEditForm() {
  const { profile, updateProfile, isLoading, error } = useUserProfile();

  // 편집 여부 관리
  const [editing, setEditing] = useState({
    user_name: false,
    password_hash: false,
    phone: false,
    email: false,
    gender: false,
  });

  // 폼 데이터를 로컬 상태로 관리 (초기값은 store의 profile 데이터 사용)
  const [formData, setFormData] = useState({
    user_name: "",
    password_hash: "",
    phone: "",
    email: "",
    gender: "",
  });

  // store의 profile이 업데이트되면 로컬 폼 데이터를 초기화합니다.
  useEffect(() => {
    // profile이 존재하고 user_name 필드가 있을 때만 초기화합니다.
    if (profile && profile.user_name) {
      setFormData({
        user_name: profile.user_name,
        password_hash: profile.password_hash,
        phone: profile.phone,
        email: profile.email,
        gender: profile.gender,
      });
      console.log("프로필 데이터 업데이트:", profile);
    }
  }, [profile]);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터를 불러오는 중 오류 발생: {error.message}</p>;

  // 변경 버튼 클릭 시 폼 데이터 업데이트
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 변경 버튼 클릭시 정보 수정 가능 함수
  const handleEditToggle = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // 저장하기 버튼 클릭 시 업데이트
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    // 저장 후 편집모드 비활성화
    setEditing({
      user_name: profile.user_name,
      password_hash: profile.password_hash,
      phone: profile.phone,
      email: profile.email,
      gender: profile.gender,
    });
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
            type="number"
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

      {/* 나이 */}
      <div className="mypage-myinfo__container">
        <div className="mypage-myinfo__list-wrapper">
          <p className="myinfo-title">비밀번호 변경</p>
          <input
            className="myinfo-value"
            type="text"
            value={formData.password_hash}
            readOnly={!editing.password_hash}
            onChange={(e) => handleChange("age", e.target.value)}
          />
          <button
            type="button"
            className="myinfo-edit"
            onClick={() => handleEditToggle("age")}
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
            <option value="남성">남성</option>
            <option value="여성">여성</option>
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

      {/* 저장하기 버튼 */}
      <button type="submit" className="myinfo-edit-submit">
        저장하기
      </button>
    </form>
  );
}
