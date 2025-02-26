import Navbar from "@/component/common/navbar/Navbar";
import useAllCampaignListStore from "@/store/useAllCampaignListStore";
import "@/style/scss/style.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const { campaignList, fetchCampaignList } = useAllCampaignListStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [sortOption, setSortOption] = useState("date");
  const sentinelRef = useRef(null);

  //api 호출
  useEffect(() => {
    fetchCampaignList();
  }, [fetchCampaignList]);

  // 제목 검색,필터링
  const filteredCampaigns = useMemo(() => {
    return campaignList.filter(
      (campaign) =>
        campaign.status === "active" &&
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [campaignList, searchQuery]);

  //정렬
  const sortedCampaigns = useMemo(() => {
    const campaigns = [...filteredCampaigns];
    if (sortOption === "date") {
      campaigns.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    } else if (sortOption === "popularity") {
      campaigns.sort((a, b) => b.like_count - a.like_count);
    }
    return campaigns;
  }, [filteredCampaigns, sortOption]);

  //무한 스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((prevCount) =>
              prevCount + 5 > sortedCampaigns.length
                ? sortedCampaigns.length
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
  }, [sortedCampaigns]);

  return (
    <>
      <Navbar />
      <div className="campaign-search-list">
        <div className="search-container" style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="제목 검색..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(5); // 검색어 변경 시 표시 개수 초기화
            }}
            className="search-input"
          />
        </div>

        {/* 정렬 옵션 UI */}
        <div className="search-sort-options" style={{ marginBottom: "1rem" }}>
          <span
            className={`search-sort-option ${
              sortOption === "date" ? "active" : ""
            }`}
            onClick={() => {
              setSortOption("date");
              setVisibleCount(5); // 정렬 옵션 변경 시 초기화
            }}
            style={{ cursor: "pointer", marginRight: "1rem" }}
          >
            날짜순
          </span>
          <span
            className={`search-sort-option ${
              sortOption === "popularity" ? "active" : ""
            }`}
            onClick={() => {
              setSortOption("popularity");
              setVisibleCount(5);
            }}
            style={{ cursor: "pointer" }}
          >
            인기순
          </span>
        </div>

        <div>
          {sortedCampaigns.slice(0, visibleCount).map((campaign) => (
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
                    height: "30rem",
                    padding: "3rem 7.8rem",
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
        </div>

        {/* 무한 스크롤을 위한 Sentinel */}
        <div ref={sentinelRef} style={{ height: "20px" }}></div>
      </div>
    </>
  );
};

export default SearchPage;
