
import heroBgDefault from "@/assets/img/categorypage-hero.png";
import donorDefault from "@/assets/img/donor.png";
// 예시로 다른 분류에 사용할 이미지들을 임포트 (파일명은 실제 상황에 맞게 변경)
import heroBgAnimal from "@/assets/img/test1.png";
import donorAnimal from "@/assets/img/category-animal.svg";
import heroBgEnvironment from "@/assets/img/category-baby.svg";
import donorEnvironment from "@/assets/img/test4.png";
import "@/style/scss/style.scss";

// 각 분류별 콘텐츠를 정의하는 객체
const heroContent = {
  전체: {
    heroBg: heroBgDefault,
    donor: donorDefault,
    title: "전체",
    subtitle: "2190건 참여중",
  },
  아동: {
    heroBg: heroBgAnimal,
    donor: donorAnimal,
    title: "아동",
    subtitle: "1500건 참여중",
  },
  환경: {
    heroBg: heroBgEnvironment,
    donor: donorEnvironment,
    title: "환경",
    subtitle: "1800건 참여중",
  },
  장애인: {
    heroBg: heroBgDefault,
    donor: donorDefault,
    title: "장애인",
    subtitle: "2190건 참여중",
  },
  지구촌: {
    heroBg: heroBgAnimal,
    donor: donorAnimal,
    title: "지구촌",
    subtitle: "1500건 참여중",
  },
  어르신: {
    heroBg: heroBgEnvironment,
    donor: donorEnvironment,
    title: "어르신",
    subtitle: "1800건 참여중",
  },
  사회: {
    heroBg: heroBgDefault,
    donor: donorDefault,
    title: "사회",
    subtitle: "2190건 참여중",
  },
  자립준비청년지원: {
    heroBg: heroBgAnimal,
    donor: donorAnimal,
    title: "자립준비청년지원",
    subtitle: "1500건 참여중",
  }
};

export default function CategoryHero({ selectedCategory }) {
  // 선택된 분류에 해당하는 콘텐츠, 없으면 기본값 사용
  const content = heroContent[selectedCategory] || {
    heroBg: heroBgDefault,
    donor: donorDefault,
    title: "아동 / 청소년",
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
      }}
    >
      <div className="category-hero">
        <img src={content.donor} className="category-hero-applicant-img" alt="donor icon" />
        <div className="category-hero-title">{content.title}</div>
        <div className="category-hero-subtitle">{content.subtitle}</div>
      </div>
    </div>
  );
}
