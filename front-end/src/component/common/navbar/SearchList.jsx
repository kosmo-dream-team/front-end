// src/component/search/CampaignSearchList.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAllCampaignListStore from "@/store/useAllCampaignListStore";
import "@/style/scss/style.scss";

const CampaignSearchList = () => {
  // 스토어에서 캠페인 리스트와 fetch 함수를 가져옴
  const { campaignList, fetchCampaignList } = useAllCampaignListStore();
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState("");
  // 화면에 표시할 항목 수
  const [visibleCount, setVisibleCount] = useState(5);
  // 무한 스크롤 Sentinel을 위한 ref
  const sentinelRef = useRef(null);

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    fetchCampaignList();
  }, [fetchCampaignList]);

  // 제목 검색 및 status가 active인 데이터 필터링
  const filteredCampaigns = useMemo(() => {
    return campaignList.filter(
      (campaign) =>
        campaign.status === "active" &&
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [campaignList, searchQuery]);

  // IntersectionObserver를 이용한 무한 스크롤
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
    <div className="campaign-search-list">
      <div className="search-container" style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="제목 검색..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setVisibleCount(5); // 검색어가 바뀌면 표시 개수 초기화
          }}
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
        />
      </div>

      {filteredCampaigns.slice(0, visibleCount).map((campaign) => (
        <div key={campaign.project_id} className="main-campaign-list">
          <Link
            to={`/campaign/${campaign.project_id}`}
            style={{ display: "block", textDecoration: "none" }}
          >
            <div
              className="layout__main-campaign-list__content"
              style={{
                backgroundImage: `url(${
                  campaign.project_image || "default-image.jpg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
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

      {/* 무한 스크롤을 위한 Sentinel */}
      <div ref={sentinelRef} style={{ height: "20px" }}></div>
    </div>
  );
};

export default CampaignSearchList;
