import useAllCampaignListStore from "@/store/useAllCampaignListStore";
import "@/style/scss/style.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const CategoryList = (props) => {
  // props.selectedCategory를 사용하여 필터링 (기본값 "전체")
  const querySelectedCategory = props.selectedCategory || "전체";

  // 화면에 표시할 항목 수
  const [visibleCount, setVisibleCount] = useState(5);
  // 정렬 옵션 상태 초기값 (내부 상태로 관리)
  const [sortOption, setSortOption] = useState("date");
  const sentinelRef = useRef(null);

  const { campaignList, fetchCampaignList } = useAllCampaignListStore();

  useEffect(() => {
    fetchCampaignList();
  }, [fetchCampaignList]);

  // 캠페인 리스트 필터링 (선택된 카테고리에 따라)
  const filteredCampaigns = useMemo(() => {
    const approvedCampaigns = campaignList.filter(
      (app) => app.status === "active"
    );
    return querySelectedCategory && querySelectedCategory !== "전체"
      ? approvedCampaigns.filter(
          (app) => app.category === querySelectedCategory
        )
      : approvedCampaigns;
  }, [campaignList, querySelectedCategory]);

  // 날짜순 , 좋아요순 정렬
  const sortedCampaigns = useMemo(() => {
    const campaigns = [...filteredCampaigns];
    if (sortOption === "date") {
      campaigns.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    } else if (sortOption === "popularity") {
      campaigns.sort((a, b) => b.like_count - a.like_count);
    }
    return campaigns;
  }, [filteredCampaigns, sortOption]);

  const handleSortChange = (option) => {
    setSortOption(option);
    setVisibleCount(5);
  };

  //무한 스크롤 선택된 카테고리가 전체가 아니라면 visibleCount 기준으로 추가 로드)
  useEffect(() => {
    if (querySelectedCategory !== "전체") {
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
      if (sentinelRef.current) observer.observe(sentinelRef.current);
      return () => {
        if (sentinelRef.current) observer.unobserve(sentinelRef.current);
      };
    }
  }, [sortedCampaigns, querySelectedCategory]);

  // 만약 선택된 카테고리가 "전체"라면 전체 캠페인을, 아니라면 visibleCount 만큼만 출력
  const campaignsToDisplay =
    querySelectedCategory === "전체"
      ? sortedCampaigns
      : sortedCampaigns.slice(0, visibleCount);

  return (
    <>
      <div className="category-list-sort">
        <span
          className={`category-list-sort-list ${
            sortOption === "date" ? "active" : ""
          }`}
          onClick={() => handleSortChange("date")}
          style={{ cursor: "pointer", marginRight: "1rem" }}
        >
          날짜순
        </span>
        <span
          className={`category-list-sort-list ${
            sortOption === "popularity" ? "active" : ""
          }`}
          onClick={() => handleSortChange("popularity")}
          style={{ cursor: "pointer" }}
        >
          인기순
        </span>
      </div>
      <div style={{ height: "2rem" }}></div>
      {campaignsToDisplay.map((campaign) => (
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
                    {campaign.user_name}
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
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
            <div className="main-campaign-list__progress-info">
              <div className="main-campaign-list__progress-percent">
                {campaign.progress}%
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
      {querySelectedCategory !== "전체" && (
        <div ref={sentinelRef} style={{ height: "20px" }}></div>
      )}
    </>
  );
};

export default CategoryList;
