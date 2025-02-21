import "../.././style/scss/style.scss";

import useCampaignStore from "../../store/useCampaignStore";

const CampaignProfile = () => {
  const { campaignStatus } = useCampaignStore();

  return (
    <div className = "profile">
      <div className = "profile-img" style = {{
         backgroundImage: 'url(' + `/src/assets/img/${campaignStatus.projectImage}` + ')'
      }}>
        <div className = "campaign-info">
          <div className = "applicant-info">
            <img className = "applicant-img" src = {campaignStatus.applicantImage} alt = "수혜자 이미지" />
            <span className = "applicant-name">{campaignStatus.applicant}</span>
          </div>
          <div className = "campaign-title">{campaignStatus.title}</div>
        </div>
      </div>
    </div>
  );
}

export default CampaignProfile;