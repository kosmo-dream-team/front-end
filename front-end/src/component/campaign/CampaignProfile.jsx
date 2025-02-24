import "@/style/scss/style.scss";

import useCampaignStore from "@/store/useCampaignStore";

const CampaignProfile = () => {
  const { campaignStatus } = useCampaignStore();

  return (
    <div className="profile">
      {/* <div
        className="profile-img"
        style={{
          backgroundImage:
            "url(" + `/src/assets/img/${campaignStatus.projectImage}` + ")",
        }}
      > */}
      <div className="campaign-info">
        <div
          className="applicant-info"
          style={{
            position: "relative",
          }}
        >
          <img
            className="applicant-img"
            src={campaignStatus.applicantImage}
            alt="배경 이미지"
          />
          <img
            className="login-profile-card-img"
            src={""}
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

          <span className="applicant-name" style={{}}>
            {campaignStatus.applicant}
          </span>
        </div>
        <div className="campaign-title">{campaignStatus.title}</div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default CampaignProfile;
