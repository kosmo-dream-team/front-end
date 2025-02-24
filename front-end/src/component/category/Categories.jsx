import allCategoriesIcon from "@/assets/img/category-all.svg";
import animalIcon from "@/assets/img/category-animal.svg";
import childIcon from "@/assets/img/category-baby.svg";
import disabilityIcon from "@/assets/img/category-disabled.svg";
import environmentIcon from "@/assets/img/category-environment.svg";
import worldIcon from "@/assets/img/category-global.svg";
import seniorIcon from "@/assets/img/category-grand-parents.svg";
import socialIcon from "@/assets/img/category-social.svg";
import useAllCampaignListStore from "@/store/useAllCampaignListStore";
import "@/style/scss/style.scss";
import { useEffect } from "react";

const categoriesData = [
  {
    type: "all",
    label: "전체",
    image: allCategoriesIcon,
  },
  {
    type: "category",
    label: "동물",
    image: animalIcon,
  },
  {
    type: "category",
    label: "아동",
    image: childIcon,
  },
  {
    type: "category",
    label: "환경",
    image: environmentIcon,
  },
  {
    type: "category",
    label: "장애인",
    image: disabilityIcon,
  },
  {
    type: "category",
    label: "지구촌",
    image: worldIcon,
  },
  {
    type: "category",
    label: "어르신",
    image: seniorIcon,
  },
  {
    type: "category",
    label: "사회",
    image: socialIcon,
  },
];

export default function Categories({ selectedCategory, setSelectedCategory }) {
  const { campaignList, fetchCampaignList } = useAllCampaignListStore();

  useEffect(() => {
    // 컴포넌트 마운트 시 전체 캠페인 데이터를 불러옵니다.
    fetchCampaignList();
  }, [fetchCampaignList]);

  // 각 카테고리별 참여 건수 계산 (전체의 경우 전체 건수)
  const getCategoryCount = (label) => {
    if (!campaignList) return 0;
    if (label === "전체") return campaignList.length;
    return campaignList.filter((campaign) => campaign.category === label)
      .length;
  };

  const handleCategoryClick = (categoryLabel) => {
    // 버튼 클릭 시 상태를 업데이트
    setSelectedCategory(categoryLabel);
  };

  return (
    <div className="categories-container">
      <div className="categories-title">
        마음이 움직이는
        <br /> 주제를 선택하세요.
      </div>
      <div>
        {categoriesData.map((item, index) => {
          const isSelected = selectedCategory === item.label;
          const count = getCategoryCount(item.label);
          const countText = `${count.toLocaleString()}건 참여중`;
          return (
            <button
              key={index}
              className={
                item.type === "all"
                  ? "all-categories-items"
                  : "categories-items"
              }
              style={{
                border: isSelected ? "2px solid #ff9191" : "none",
              }}
              onClick={() => handleCategoryClick(item.label)}
            >
              <img
                src={item.image}
                alt={item.label}
                className={
                  item.type === "all"
                    ? "all-categories-icon"
                    : "categories-icon"
                }
              />
              <div
                className={
                  item.type === "all"
                    ? "all-categories-label-wrapper"
                    : "categories-label-wrapper"
                }
              >
                <span
                  className={
                    item.type === "all"
                      ? "all-categories-label"
                      : "categories-label"
                  }
                >
                  {item.label}
                </span>
                <div
                  className={
                    item.type === "all"
                      ? "all-categories-sub-label"
                      : "categories-sub-label"
                  }
                >
                  {countText}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
