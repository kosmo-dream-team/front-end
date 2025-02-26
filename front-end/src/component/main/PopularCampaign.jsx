import useTopCampaginListStore from "@/store/useTopCampaginListStore";
import "@/style/scss/style.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "http://localhost:8586/images/";
const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

// 이미지가 파일명 형태이면 기본 경로를 붙여 전체 URL로 반환하는 함수
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
            className="popular-campaign__item popular-campaign__item--second"
            key={campaign.user_id + index}
            onClick={() => goToCampaignDetail(campaign.project_id)}
            style={{ cursor: "pointer" }}
          >
            {/* 이미지 영역 */}
            <div className="popular-campaign__item-img-container">
              <img
                className="popular-campaign__item-img"
                src={
                  getImageUrl(campaign.project_image) ||
                  "https://via.placeholder.com/200x137"
                }
                alt="캠페인 이미지"
              />
            </div>

            {/* 캠페인 제목 */}
            <div className="popular-campaign__item-title-container popular-campaign__item-title-container--large">
              <div className="popular-campaign__item-title">
                {campaign.title || "제목이 없습니다"}
              </div>
            </div>

            {/* 수혜자 또는 주관 단체 */}
            <div className="popular-campaign__item-org-container">
              <div className="popular-campaign__item-org">
                {campaign.user_name || "단체명"}
              </div>
            </div>

            {/* 진행도(Progress) 바 */}
            <div className="popular-campaign__item-progress-container">
              <div
                className="popular-campaign__item-progress popular-campaign__item-progress--second"
                style={{ width: `${campaign.progresS || 0}%` }}
              />
            </div>

            {/* 목표 금액 & 진행도 퍼센트 표시 */}
            <div className="popular-campaign__item-amount popular-campaign__item-amount--second">
              {campaign.target_amount
                ? `${campaign.target_amount.toLocaleString()}원`
                : "0원"}
            </div>
            <div
              className="popular-campaign__item-percent popular-campaign__item-percent--second"
              style={{ whiteSpace: "nowrap" }}
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
