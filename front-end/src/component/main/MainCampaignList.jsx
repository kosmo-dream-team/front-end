import { useEffect } from "react";
import baby1 from "../../assets/img/baby1.jpg";
import useTop15CampaginListStore from "../../store/useTop15CampaginListStore";
import "../../style/scss/style.scss";

export default function MainCampaignList() {
  // Zustand 스토어에서 state와 함수를 가져옴
  const { campaignList, fetchCampaignList } = useTop15CampaginListStore();

  useEffect(() => {
    fetchCampaignList(); // 컴포넌트 마운트 시점에 API 호출
  }, [fetchCampaignList]);

  // 4번째~15번째 (인덱스 3~14)만 화면에 출력
  const slicedCampaigns = campaignList.slice(3, 15);

  return (
    <>
      {slicedCampaigns.map((campaign, index) => (
        <div
          className="main-campaign-list"
          key={`${campaign.user_id}-${index}`}
        >
          <div
            className="layout__main-campaign-list__content"
            // API에서 받아온 이미지 URL 사용 (없으면 기본 이미지 baby1 사용)
            style={{
              backgroundImage: `url(${campaign.project_image || baby1})`,
            }}
          >
            <div className="main-campaign-list__title">
              <div className="main-campaign-list__category">
                <div className="main-campaign-list__category-text">
                  {/* 서버에서 받아온 카테고리 */}
                  {campaign.category_id || "카테고리"}
                </div>
              </div>
              <div className="main-campaign-list__quote">
                {/* 서버에서 받아온 제목 */}
                {campaign.title}
              </div>
              <div className="main-campaign-list__beneficiary">
                <div className="main-campaign-list__beneficiary-text">
                  {campaign.user_id}
                </div>
              </div>
            </div>
            <div className="main-campaign-list__deadline">
              {/* 남은 기간: d_daY 사용 */}
              <div className="main-campaign-list__deadline-text">
                D-{campaign.d_daY}
              </div>
            </div>
          </div>
          <div className="main-campaign-list__progress-wrapper">
            <div className="main-campaign-list__progress-bar">
              <div
                className="main-campaign-list__progress-fill"
                style={{ width: `${campaign.progresS}%` }}
              />
            </div>
            <div className="main-campaign-list__progress-info">
              <div className="main-campaign-list__progress-percent">
                {campaign.progresS}%
              </div>
              <div className="main-campaign-list__amount">
                {campaign.target_amount.toLocaleString()} 원
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
