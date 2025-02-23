// src/component/category/Categories.jsx
import animalIcon from "@/assets/img/category-animal.svg";
import childIcon from "@/assets/img/category-baby.svg";
import disabilityIcon from "@/assets/img/category-disabled.svg";
import environmentIcon from "@/assets/img/category-environment.svg";
import worldIcon from "@/assets/img/category-global.svg";
import seniorIcon from "@/assets/img/category-grand-parents.svg";
import socialIcon from "@/assets/img/category-social.svg";
import allCategoriesIcon from "@/assets/img/test1.png";

import "@/style/scss/style.scss";

// 카테고리 데이터를 이미지와 함께 객체로 관리
const categoriesData = [
  {
    type: "all",
    label: "전체",
    subLabel: "12,522건 참여중",
    image: allCategoriesIcon,
  },
  {
    type: "category",
    label: "동물",
    subLabel: "12,522건 참여중",
    image: animalIcon,
  },
  {
    type: "category",
    label: "아동",
    subLabel: "12,522건 참여중",
    image: childIcon,
  },
  {
    type: "category",
    label: "환경",
    subLabel: "12,522건 참여중",
    image: environmentIcon,
  },
  {
    type: "category",
    label: "장애인",
    subLabel: "12,522건 참여중",
    image: disabilityIcon,
  },
  {
    type: "category",
    label: "지구촌",
    subLabel: "12,522건 참여중",
    image: worldIcon,
  },
  {
    type: "category",
    label: "어르신",
    subLabel: "12,522건 참여중",
    image: seniorIcon,
  },
  {
    type: "category",
    label: "사회",
    subLabel: "12,522건 참여중",
    image: socialIcon,
  },
];

// 버튼의 인덱스를 받아 1-based 기준 짝수이면 배경색을 lightgray로 설정
const getButtonStyle = (index) => {
  return (index + 1) % 2 === 0 ? { backgroundColor: "lightgray" } : {};
};

export default function Categories({ selectedCategory, setSelectedCategory }) {
  // 버튼 클릭 시 선택된 분류를 변경
  const handleCategoryClick = (categoryLabel) => {
    // 이미 선택된 경우 다시 클릭하면 전체(빈 문자열)로 초기화할 수도 있음
    setSelectedCategory((prev) =>
      prev === categoryLabel ? "" : categoryLabel
    );
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
          return (
            <button
              key={index}
              className={
                item.type === "all"
                  ? "all-categories-items"
                  : "categories-items"
              }
              style={{
                ...getButtonStyle(index),
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
                  {item.subLabel}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
