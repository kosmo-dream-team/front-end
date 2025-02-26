import arrowRight from "@/assets/img/arrow-right.svg";
import baby1 from "@/assets/img/baby1.jpg";
import useAllCampaignListStore from "@/store/useAllCampaignListStore";
import "@/style/scss/style.scss";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewCampagin = () => {
  const { campaignList, fetchCampaignList } = useAllCampaignListStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaignList();
  }, [fetchCampaignList]);

  // active 상태의 캠페인만 필터링 후, start_date 기준 내림차순 정렬하여 최신 3개만 추출
  const activeCampaigns = campaignList.filter(
    (campaign) => campaign.status === "active"
  );
  const latestCampaigns = [...activeCampaigns]
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    .slice(0, 3);

  // 캠페인 상세 페이지로 이동하는 함수
  const goToCampaignDetail = (project_id) => {
    navigate(`/campaign/${project_id}`);
  };

  return (
    <div className="campaign-section">
      {/* 헤더 영역: 제목 + 전체보기 */}
      <div className="campaign-section__header">
        <div className="campaign-section__title">새로운 캠페인이에요</div>
        <Link
          to="/pages/category?selectedCategory=전체&sort=date"
          className="campaign-section__view-all"
        >
          <div className="campaign-section__view-all-text">전체보기</div>
          <img src={arrowRight} alt="전체보기" />
        </Link>
      </div>

      {/* 슬라이더 영역 */}
      <div className="campaign-section__slider">
        <div className="campaign-slider-container">
          <div className="campaign-slider__track">
            {/* 좌측 여백(스페이서) */}
            <div className="campaign-slider__spacer" />
            {/* 최신 3개 캠페인 아이템들 */}
            <div className="campaign-items">
              {latestCampaigns.map((campaign) => (
                <div
                  className="campaign-item"
                  key={campaign.project_id}
                  onClick={() => goToCampaignDetail(campaign.project_id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="campaign-item__image"
                    src={campaign.project_image || baby1}
                    alt={campaign.title}
                  />
                  <div className="campaign-item__details">
                    <div className="campaign-item__title">{campaign.title}</div>
                    <div className="campaign-item__sponsor">
                      {campaign.user_name}
                    </div>
                    <div className="campaign-item__progress-bg">
                      <div
                        className="campaign-item__progress-bar"
                        style={{ width: `${campaign.progress || 0}%` }}
                      />
                    </div>
                    <div className="new-campaign-item">
                      <div className="campaign-item__donation-percent">
                        {campaign.progress || 0}%
                      </div>
                      <div className="campaign-item__donation-amount">
                        <span>
                          {Number(campaign.target_amount).toLocaleString()} 원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 우측 여백(스페이서) – 3개 */}
            <div className="campaign-slider__spacer" />
            <div className="campaign-slider__spacer" />
            <div className="campaign-slider__spacer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCampagin;
