import { useEffect, useState } from "react";
import useUserProfile from "../../store/useUserProfile";
import "../../style/scss/style.scss";

export default function MyPageMenu() {
  const { profile, fetchProfile, setProfileImage, isLoading, error } =
    useUserProfile();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // 모달 열림 여부 및 새 이미지 URL 관리를 위한 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);

  // 프로필 이미지 또는 '프로필 이미지 변경' 버튼 클릭 시 모달 오픈
  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 (모달 외부 클릭 또는 닫기 버튼)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewImage(null); // 선택한 이미지 초기화
  };

  // 파일 선택 시 미리보기 URL 생성
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setNewImage(imageUrl);
    }
  };

  // '이미지 변경 저장' 버튼 클릭 시 Zustand 상태 업데이트
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
          <a href="" className="mypage-menu-sub-menu">
            My 홈
          </a>
        </div>
      </div>

      {/* 이미지 업로드 모달 */}
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
