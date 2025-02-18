import heroBg from "@/assets/img/categorypage-hero.png";
import donor from "@/assets/img/donor.png";
import "@/style/scss/style.scss";

export default function CategoryHero() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${heroBg})`,
          width: `100%`,
          height: `100%`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.8,
        }}
      >
        <div className="category-hero">
          <img src={donor} className="category-hero-applicant-img" />
          <div className="categroy-hero-title">아동 / 청소년</div>
          <div className="category-hero-subtitle">2190건 참여중</div>
        </div>
      </div>
    </>
  );
}
