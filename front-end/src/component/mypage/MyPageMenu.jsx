import { useState } from "react";
import useUserProfile from "../../store/useUserProfile";
import "../../style/scss/style.scss";

export default function MyPageMenu() {
  const { profile, setProfileImage, isLoading, error } = useUserProfile();

  // 모달 열림 여부 및 이미지 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState(null);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewImageFile(null);
    setNewImageUrl(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setNewImageUrl(imageUrl);
    }
  };

  // 여기서는 store에 이미지만 업데이트 (백엔드 API 호출 X)
  const handleUpdateImage = () => {
    if (newImageFile) {
      // File 객체를 store에 저장
      setProfileImage(newImageFile);
      handleCloseModal();
      console.log("새 이미지 저장 (File 객체):", newImageFile);
    } else {
      alert("새로운 이미지를 선택해주세요.");
    }
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터를 불러오는 중 오류 발생: {error.message}</p>;

  return (
    <>
      <div className="mypage-menu-container">
        <div className="profile-card">
          <div className="profile-card__background"></div>
          <div className="profile-card__text">
            {profile.user_name}
            <br />
            {profile.email?.slice(0, 5) || ""}**
          </div>
          <img
            className="profile-card__img"
            src={profile.profile_image}
            alt="Profile"
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <button onClick={handleImageClick}>프로필 이미지 변경</button>
        <div className="mypage-menu-sub-menu-container">
          <a href="#" className="mypage-menu-sub-menu">
            My 홈
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              X
            </button>
            <h2>프로필 이미지 변경</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div className="image-preview">
              {newImageUrl ? (
                <img
                  src={newImageUrl}
                  alt="New Profile Preview"
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                <img
                  src={profile.profile_image}
                  alt="Current Profile"
                  style={{ maxWidth: "100%" }}
                />
              )}
            </div>
            <button onClick={handleUpdateImage}>이미지 변경 저장</button>
          </div>
        </div>
      )}
    </>
  );
}
