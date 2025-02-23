// 예시로 다른 분류에 사용할 이미지들을 임포트 (파일명은 실제 상황에 맞게 변경)
import allBg from "@/assets/img/all-bg.jpg";
import animalBg from "@/assets/img/animal-bg.jpg";
import socialBg from "@/assets/img/auth7.jpg";
import { default as allCategoriesIcon } from "@/assets/img/category-all-ques.png";
import animalIcon from "@/assets/img/category-animal.svg";
import { default as childIcon } from "@/assets/img/category-baby.svg";
import disabilityIcon from "@/assets/img/category-disabled.svg";
import environmentIcon from "@/assets/img/category-environment.svg";
import worldIcon from "@/assets/img/category-global.svg";
import seniorIcon from "@/assets/img/category-grand-parents.svg";
import socialIcon from "@/assets/img/category-social.svg";
import childBg from "@/assets/img/child-bg.jpg";
import disableBg from "@/assets/img/disable-bg.jpg";
import envBg from "@/assets/img/env-bg.jpg";
import grandFBg from "@/assets/img/grand-f-bg.jpg";
import worldBg from "@/assets/img/world-bg.jpg";
import "@/style/scss/style.scss";
// 각 분류별 콘텐츠를 정의하는 객체
const heroContent = {
  전체: {
    heroBg: allBg,
    icon: allCategoriesIcon,
    title: "전체",
    subtitle: "2190건 참여중",
  },
  아동: {
    heroBg: childBg,
    icon: childIcon,
    title: "아동",
    subtitle: "1500건 참여중",
  },
  환경: {
    heroBg: envBg,
    icon: environmentIcon,
    title: "환경",
    subtitle: "1800건 참여중",
  },
  장애인: {
    heroBg: disableBg,
    icon: disabilityIcon,
    title: "장애인",
    subtitle: "2190건 참여중",
  },
  지구촌: {
    heroBg: worldBg,
    icon: worldIcon,
    title: "지구촌",
    subtitle: "1500건 참여중",
  },
  어르신: {
    heroBg: grandFBg,
    icon: seniorIcon,
    title: "어르신",
    subtitle: "1800건 참여중",
  },
  사회: {
    heroBg: socialBg,
    icon: socialIcon,
    title: "사회",
    subtitle: "2190건 참여중",
  },
  동물: {
    heroBg: animalBg,
    icon: animalIcon,
    title: "자립준비청년지원",
    subtitle: "1500건 참여중",
  },
};

export default function CategoryHero({ selectedCategory }) {
  // 선택된 분류에 해당하는 콘텐츠, 없으면 기본값 사용
  const content = heroContent[selectedCategory] || {
    heroBg: allBg,
    icon: allCategoriesIcon,
    title: "전체",
    subtitle: "2190건 참여중",
  };

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
        <div className="category-hero-title" style={{ fontSize: "2rem" }}>
          {content.title}
        </div>
        <div className="category-hero-subtitle">{content.subtitle}</div>
      </div>
    </div>
  );
}
