import DefaultUserImg from "@/assets/img/default-user-img.svg";
import useCampaignStore from "@/store/useCampaignStore";
import "@/style/scss/style.scss";
const IMAGE_BASE_URL = "http://localhost:8586/images/";
const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

const getImageUrl = (image) => {
  if (
    typeof image === "string" &&
    supportedExtensions.some((ext) => image.toLowerCase().endsWith(ext)) &&
    !image.startsWith("http")
  ) {
    return IMAGE_BASE_URL + image;
  }
  return image;
};

const CampaignProfile = () => {
  const { campaignStatus } = useCampaignStore();

  return (
    <div className="profile">
      <div className="campaign-info">
        <div
          className="applicant-info"
          style={{
            position: "relative",
          }}
        >
          <div
            className="campaign-title"
            style={{
              fontSize: "2rem",
              width: "50rem",
              textAlign: "left",
              marginLeft: "3rem",
              color: "white",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
            }}
          >
            {campaignStatus.title ?? "병원비 걱정없이 치료받고 싶어요."}
          </div>
          <img
            className="applicant-img"
            src={campaignStatus.projectImage}
            alt="배경 이미지"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          {/* 캠페인 제목 */}
          <img
            className="login-profile-card-img"
            src={getImageUrl(campaignStatus.applicantImage) || DefaultUserImg}
            alt="Profile"
            style={{
              position: "absolute",
              left: "3rem",
              bottom: "4rem",
              cursor: "pointer",
              border: "0.3rem solid #ff9191",
              borderStyle: "outset",
            }}
          />
          <span className="applicant-name">{campaignStatus.applicant}</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignProfile;
