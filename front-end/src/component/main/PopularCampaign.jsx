import useTopCampaginListStore from "@/store/useTopCampaginListStore";
import "@/style/scss/style.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function PopularCampaign() {
  // Zustand 스토어에서 state와 함수를 가져옴
  const { campaignList, fetchCampaignList } = useTopCampaginListStore();
  const navigate = useNavigate();
  // 컴포넌트가 마운트될 때 15개 캠페인 데이터를 받아옴
  useEffect(() => {
    fetchCampaignList();
  }, [fetchCampaignList]);

  // 상위 3개 캠페인만 추출 (배열 길이가 3 미만이면 그대로 사용)
  const topThreeCampaigns = campaignList.slice(0, 3);
  // 캠페인 상세 페이지로 이동하는 함수
  const goToCampaignDetail = (project_id) => {
    navigate(`/campaign/${project_id}`);
  };
  return (
    <div className="popular-campaign">
      <div className="popular-campaign__title">가장 많이 기부 중인 모금함</div>
      <div className="popular-campaign__subtitle">
        오늘, 기부 하셨나요? 당신의 마음도 함께 나눠주세요!
      </div>

      <div className="popular-campaign__items-wrapper">
        {topThreeCampaigns.map((campaign, index) => (
          <div
            className={`popular-campaign__item popular-campaign__item--${
              index === 0 ? "first" : index === 1 ? "second" : "third"
            }`}
            key={campaign.user_id + index}
            onClick={() => goToCampaignDetail(campaign.project_id)} // 캠페인 아이디로 상세 페이지 이동
            style={{ cursor: "pointer" }} // 클릭 가능한 UI임을 명시
          >
            {/* 이미지 영역 */}
            <div className="popular-campaign__item-img-container">
              <img
                className="popular-campaign__item-img"
                src={
                  campaign.project_image ||
                  "https://via.placeholder.com/200x137"
                }
                alt="캠페인 이미지"
              />
            </div>

            {/* 캠페인 제목 */}
            <div
              className={`popular-campaign__item-title-container ${
                index === 0
                  ? "popular-campaign__item-title-container--small"
                  : "popular-campaign__item-title-container--large"
              }`}
            >
              <div className="popular-campaign__item-title">
                {campaign.title || "제목이 없습니다"}
              </div>
            </div>

            {/* 수혜자 또는 주관 단체 */}
            <div className="popular-campaign__item-org-container">
              <div className="popular-campaign__item-org">
                {campaign.user_id || "단체명"}
              </div>
            </div>

            {/* 진행도(Progress) 바 */}
            <div className="popular-campaign__item-progress-container">
              {/* 진행도를 인라인 스타일로 반영 (progresS 값이 % 단위라고 가정) */}
              <div
                className={`popular-campaign__item-progress popular-campaign__item-progress--${
                  index === 0 ? "first" : index === 1 ? "second" : "third"
                }`}
                style={{ width: `${campaign.progresS || 0}%` }}
              />
            </div>

            {/* 목표 금액 & 진행도 퍼센트 표시 */}
            <div
              className={`popular-campaign__item-amount popular-campaign__item-amount--${
                index === 0 ? "first" : index === 1 ? "second" : "third"
              }`}
            >
              {campaign.target_amount
                ? `${campaign.target_amount.toLocaleString()}원`
                : "0원"}
            </div>
            <div
              className={`popular-campaign__item-percent popular-campaign__item-percent--${
                index === 0 ? "first" : index === 1 ? "second" : "third"
              }`}
            >
              {campaign.progresS ? `${campaign.progresS}%` : "0%"}
            </div>

            {/* 남은 기간 (D-day) 표시 */}
            {campaign.d_daY !== undefined && (
              <div className="popular-campaign__item-deadline">
                {`D-${campaign.d_daY}`}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
