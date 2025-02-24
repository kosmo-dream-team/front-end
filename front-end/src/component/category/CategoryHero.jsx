import allBg from "@/assets/img/all-bg.png";
import animalBg from "@/assets/img/animal-bg.png";
import { default as allCategoriesIcon } from "@/assets/img/category-all.svg";
import animalIcon from "@/assets/img/category-animal.svg";
import { default as childIcon } from "@/assets/img/category-baby.svg";
import disabilityIcon from "@/assets/img/category-disabled.svg";
import environmentIcon from "@/assets/img/category-environment.svg";
import worldIcon from "@/assets/img/category-global.svg";
import seniorIcon from "@/assets/img/category-grand-parents.svg";
import socialIcon from "@/assets/img/category-social.svg";
import childBg from "@/assets/img/child-bg.png";
import disableBg from "@/assets/img/disable-bg.jpg";
import envBg from "@/assets/img/env-bg.jpg";
import grandFBg from "@/assets/img/grand-f-bg.jpg";
import socialBg from "@/assets/img/social-bg2.png";
import worldBg from "@/assets/img/world-bg.png";
import useAllCampaignListStore from "@/store/useAllCampaignListStore";
import "@/style/scss/style.scss";
import { useEffect, useMemo } from "react";

const heroContent = {
  전체: {
    heroBg: allBg,
    icon: allCategoriesIcon,
    title: "전체",
    // 기본 참여건수는 0으로 처리 (동적으로 계산)
    subtitle: "0건 참여중",
  },
  아동: {
    heroBg: childBg,
    icon: childIcon,
    title: "아동",
    subtitle: "0건 참여중",
  },
  환경: {
    heroBg: envBg,
    icon: environmentIcon,
    title: "환경",
    subtitle: "0건 참여중",
  },
  장애인: {
    heroBg: disableBg,
    icon: disabilityIcon,
    title: "장애인",
    subtitle: "0건 참여중",
  },
  지구촌: {
    heroBg: worldBg,
    icon: worldIcon,
    title: "지구촌",
    subtitle: "0건 참여중",
  },
  어르신: {
    heroBg: grandFBg,
    icon: seniorIcon,
    title: "어르신",
    subtitle: "0건 참여중",
  },
  사회: {
    heroBg: socialBg,
    icon: socialIcon,
    title: "사회",
    subtitle: "0건 참여중",
  },
  동물: {
    heroBg: animalBg,
    icon: animalIcon,
    title: "동물",
    subtitle: "0건 참여중",
  },
};

export default function CategoryHero({ selectedCategory }) {
  const { campaignList, fetchCampaignList } = useAllCampaignListStore();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 전체 캠페인 데이터를 불러옵니다.
    fetchCampaignList();
  }, [fetchCampaignList]);

  // 선택된 카테고리별 참여 건수 계산
  const participationCount = useMemo(() => {
    if (!campaignList || campaignList.length === 0) return 0;
    if (selectedCategory === "전체") return campaignList.length;
    return campaignList.filter(
      (campaign) => campaign.category === selectedCategory
    ).length;
  }, [campaignList, selectedCategory]);

  // heroContent 객체에서 선택된 카테고리에 해당하는 값을 가져오되, 동적으로 계산된 참여 건수로 subtitle을 덮어씁니다.
  const content = heroContent[selectedCategory] || heroContent["전체"];
  const dynamicSubtitle = `${participationCount.toLocaleString()}건 참여중`;

  return (
    <div
      style={{
        backgroundImage: `url(${content.heroBg})`,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.8,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="category-hero">
        <img
          src={content.icon}
          className="category-hero-applicant-img"
          alt="donor icon"
        />
        <div
          className="category-hero-title"
          style={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          {content.title}
        </div>
        <div className="category-hero-subtitle">{dynamicSubtitle}</div>
      </div>
    </div>
  );
}
