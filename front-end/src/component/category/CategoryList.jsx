// src/component/category/CategoryList.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAllCampaignListStore from "@/store/useAllCampaignListStore";
import "@/style/scss/style.scss";


const CategoryList = ({ selectedCategory }) => {
  // 화면에 표시할 항목 수
  const [visibleCount, setVisibleCount] = useState(5);
  // Sentinel을 위한 ref
  const sentinelRef = useRef(null);

  // 스토어에서 캠페인 리스트와 fetch 함수를 가져옴
  const { campaignList, fetchCampaignList } = useAllCampaignListStore();

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    fetchCampaignList();
  }, [fetchCampaignList]);

  // 캠페인 리스트 중 승인된 데이터만 필터링 후, 선택한 카테고리에 따라 추가 필터링 (전체 또는 선택된 카테고리)
  const filteredCampaigns = useMemo(() => {
    const approvedCampaigns = campaignList.filter(
      (app) => app.status === "active"
    );
    return selectedCategory && selectedCategory !== "전체"
      ? approvedCampaigns.filter((app) => app.category === selectedCategory)
      : approvedCampaigns;
  }, [campaignList, selectedCategory]);

  // IntersectionObserver로 스크롤 시 추가 렌더링 처리
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((prevCount) =>
              prevCount + 5 > filteredCampaigns.length
                ? filteredCampaigns.length
                : prevCount + 5
            );
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [filteredCampaigns]);

  return (
    <>
      <div className="category-list-sort">
        <span className="category-list-sort-list">날짜순</span>
        <span className="category-list-sort-list">인기순</span>
      </div>

      {/* Categories 컴포넌트에서 선택한 카테고리를 기준으로 하는 필터 영역 */}
      <div style={{ height: "2rem" }}></div>

      {filteredCampaigns.slice(0, visibleCount).map((campaign) => (
  <div key={campaign.project_id} className="main-campaign-list">
    <Link
      to={`/campaign/${campaign.project_id}`}
      style={{ display: "block", textDecoration: "none" }}
    >
      <div
        className="layout__main-campaign-list__content"
        style={{
          backgroundImage: `url(${campaign.project_image || "default-image.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "fill",
          height: "300px",
        }}
      >
        <div className="main-campaign-list__title">
          <div className="main-campaign-list__category">
            <div
              className="main-campaign-list__category-text"
              style={{ color: "#fff", fontWeight: "bold" }}
            >
              {campaign.category}
            </div>
          </div>
          <div
            className="main-campaign-list__quote"
            style={{
              color: "#fff",
              fontSize: "1.8rem",
              fontWeight: "bold",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
            }}
          >
            {campaign.title}
          </div>
          <div className="main-campaign-list__beneficiary">
            <div
              className="main-campaign-list__beneficiary-text"
              style={{ color: "#fff" }}
            >
              {campaign.user_id}
            </div>
          </div>
        </div>
        <div className="main-campaign-list__deadline">
          <div
            className="main-campaign-list__deadline-text"
            style={{ color: "#fff" }}
          >
            D-{campaign.d_day}
          </div>
        </div>
      </div>
    </Link>
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
        <div
          className="main-campaign-list__amount"
          style={{ color: "black", fontSize: "2rem" }}
        >
          {Number(campaign.target_amount).toLocaleString()} 원
        </div>
      </div>
    </div>
  </div>
))}


      {/* Sentinel 요소: 추가 항목 로드를 위한 영역 */}
      <div ref={sentinelRef} style={{ height: "20px" }}></div>
    </>
  );
};

export default CategoryList;
