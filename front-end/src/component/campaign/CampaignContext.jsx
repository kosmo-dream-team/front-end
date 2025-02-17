import "../.././style/scss/style.scss";

import CampaignStatus from "../../component/campaign/CampaignStatus";

import useCampaignStore from "../../store/useCampaignStore";

const CampaignContext = () => {
  const { campaignStatus } = useCampaignStore();

  return (
    <div className = "context-wrapper">
      <CampaignStatus />

      <div className = "donation-overview">
        <div className = "overview-text">
          드림온 외 {campaignStatus.donorCount}명의 이름으로 소아암 환자 1명에게 {campaignStatus.accumulatedDonation}원을 지원합니다.
        </div>
      </div>
      <div className = "fundraising-period">모금기간 {campaignStatus.startDate} ~ {campaignStatus.endDate}</div>
      <div className = "context">
        {campaignStatus.description}
      </div>

      <div className = "category-list-wrapper">
        <div className = "category-list">
          {/* {campaignStatus.categoryList.map((category, index) => (
            <div className = "category" key = {index}>#{category.name}</div>
          ))} */}
          <div className = "category">#{campaignStatus.category}</div>
        </div>
      </div>

      <div className = "donor-list-wrapper">
        <div className = "donor-count-wrapper">
          <div className = "donor-text">기부 발자국</div>
          <div className = "donor-count">총 {campaignStatus.donorCount}명</div>
        </div>
        <div className = "donor-list">
          {/* {campaignStatus.donorList.map((donor, index) => (
            <div className = "donor-wrapper" key = {index}>
              <div className = "donor-img" style = {{backgroundImage: 'url('+donor.profileImg+')'}} />
              <div className = "donor-name">{donor.userName}</div>
            </div>
          ))} */}
          {campaignStatus.donors.map((donor, index) => (
            <div className = "donor-wrapper" key = {index}>
              <div className = "donor-name">{donor}</div>
            </div>
          ))}
        </div>
      </div>

      <div className = "comment-section-wrapper">
        <div className = "commenting-section">
          <div className = "comment-text">따뜻한 댓글을 남겨주세요</div>
          <div className = "comment-write-wrapper">
            <div className = "comment" contentEditable data-text = "댓글 남기기" />
            <div className = "comment-btn">댓글 작성</div>
          </div>
          <div className = "comment-recommend-wrapper">
            <div className = "comment-recommend">응원합니다.</div>
            <div className = "comment-recommend">우리 함께 합시다!</div>
            <div className = "comment-recommend">함께 참여해주세요.</div>
          </div>
        </div>
        {/* <div className = "comment-section">
          <div className = "comment-count">댓글{campaignStatus.commentList.length}개</div>
          <div className = "comment-list-wrapper">
            <div className = "comment-list">
              {campaignStatus.commentList.map((comment, index) => (
                <div className = "comment-wrapper" key = {index}>
                  <div className = "comment-img-wrapper">
                    <div className = "user-img" style = {{backgroundImage: 'url('+comment.profileImg+')'}} />
                    <div className = "comment-content-wrapper">
                      <div className = "comment-name">{comment.userName}</div>
                      <div className = "comment-content">{comment.comment}</div>
                    </div>
                  </div>
                  <div className = "comment-info-wrapper">
                    <div className = "comment-like-wrapper">
                      <div className = "comment-like-img" />
                      {comment.likeCount}
                    </div>
                    <div className = "comment-post-date">{comment.postDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default CampaignContext;