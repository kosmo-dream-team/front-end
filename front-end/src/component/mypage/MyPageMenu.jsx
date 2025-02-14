import { useState } from "react";
import useUserProfile from "../../store/useUserProfile";
import "../../style/scss/style.scss";

export default function MyPageMenu() {
  // fetchProfile() 호출 제거 → 로그인 시 저장된 상태를 그대로 사용
  const { profile, setProfileImage, isLoading, error } = useUserProfile();

  // 모달 열림 여부 및 새 이미지 URL 관리를 위한 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewImage(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setNewImage(imageUrl);
    }
  };

  const handleUpdateImage = () => {
    if (newImage) {
      setProfileImage(newImage);
      handleCloseModal();
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
            {profile.name}
            <br />
            {profile.email.slice(0, 5)}**
          </div>
          <img
            className="profile-card__img"
            src={profile.img}
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
              {newImage ? (
                <img
                  src={newImage}
                  alt="New Profile Preview"
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                <img
                  src={profile.img}
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
