// src/component/category/CategoryList.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fakeData } from "../../data/fakeData";
import "../../style/scss/style.scss";

// 남은 일수를 계산하는 함수
const calculateDaysRemaining = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `D-${diffDays}` : "마감";
};

const CategoryList = () => {
  // 분류 선택 상태 (빈 문자열이면 전체)
  const [selectedCategory, setSelectedCategory] = useState("");
  // 화면에 표시할 항목 수
  const [visibleCount, setVisibleCount] = useState(5);
  // Sentinel을 위한 ref
  const sentinelRef = useRef(null);

  // 분류 선택 핸들러
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setVisibleCount(5); // 분류 변경 시 초기 개수로 리셋
  };

  // fakeData에서 승인된 게시글만 필터링하고, 선택된 분류로 추가 필터링 (메모이제이션)
  const filteredCampaigns = useMemo(() => {
    const approvedCampaigns = fakeData.applications.filter(
      (app) => app.status === "승인"
    );
    return selectedCategory
      ? approvedCampaigns.filter((app) => app.category === selectedCategory)
      : approvedCampaigns;
  }, [selectedCategory]);

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

      {/* 분류 선택 필터 */}
      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="categoryFilter" style={{ marginRight: "0.5rem" }}>
          분류:
        </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">전체</option>
          <option value="아동">아동</option>
          <option value="동물">동물</option>
          <option value="환경">환경</option>
          <option value="장애인">장애인</option>
          <option value="지구촌">지구촌</option>
          <option value="어르신">어르신</option>
          <option value="사회">사회</option>
        </select>
      </div>

      <div style={{ height: "2rem" }}></div>

      {filteredCampaigns.slice(0, visibleCount).map((campaign) => (
        <div key={campaign.id} className="main-campaign-list">
          {/* 배경 이미지 전체를 Link로 감쌉니다. */}
          <Link
            to={`/campaign/${campaign.id}`}
            style={{ display: "block", textDecoration: "none" }}
          >
            <div
              className="layout__main-campaign-list__content"
              style={{
                backgroundImage: `url(${
                  campaign.attachment || "default-image.jpg"
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
                    {campaign.beneficiaryName}
                  </div>
                </div>
              </div>
              <div className="main-campaign-list__deadline">
                <div
                  className="main-campaign-list__deadline-text"
                  style={{ color: "#fff" }}
                >
                  {calculateDaysRemaining(campaign.deadline)}
                </div>
              </div>
            </div>
          </Link>
          <div className="main-campaign-list__progress-wrapper">
            <div className="main-campaign-list__progress-bar">
              <div className="main-campaign-list__progress-fill" />
            </div>
            <div className="main-campaign-list__progress-info">
              <div className="main-campaign-list__progress-percent">33%</div>
              <div
                className="main-campaign-list__amount"
                style={{ color: "black", fontSize: "2rem" }}
              >
                {Number(campaign.targetAmount).toLocaleString()} 원
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Sentinel 요소: 화면 하단에 위치하며, 이 요소가 보이면 추가 항목을 로드합니다. */}
      <div ref={sentinelRef} style={{ height: "20px" }}></div>
    </>
  );
};

export default CategoryList;
