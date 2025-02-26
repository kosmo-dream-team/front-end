import CategoryAll from "@/assets/img/category-all.svg";
import CategoryAnimal from "@/assets/img/category-animal.svg";
import CategoryBaby from "@/assets/img/category-baby.svg";
import CategoryDisabled from "@/assets/img/category-disabled.svg";
import CategoryEnvironment from "@/assets/img/category-environment.svg";
import CategoryGlobal from "@/assets/img/category-global.svg";
import GrandF from "@/assets/img/category-grand-parents.svg";
import CategorySocial from "@/assets/img/category-social.svg";
import "@/style/scss/style.scss";
import { Link } from "react-router-dom";

const categories = [
  { icon: CategoryBaby, label: "아동" },
  { icon: CategoryAnimal, label: "동물" },
  { icon: CategoryEnvironment, label: "환경" },
  { icon: CategoryDisabled, label: "장애인" },
  { icon: CategoryGlobal, label: "지구촌" },
  { icon: GrandF, label: "어르신" },
  { icon: CategorySocial, label: "사회" },
  { icon: CategoryAll, label: "전체" },
];

export default function MainCategory() {
  return (
    <div className="donation-card">
      <div className="donation-card__title">나의 도움이 필요한 모금함은?</div>
      <div className="donation-card__categories">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/pages/category?selectedCategory=${encodeURIComponent(
              category.label
            )}&sort=date`}
          >
            <div className="donation-card__category">
              <div className="donation-card__category-icon">
                <img
                  src={category.icon}
                  alt={category.label}
                  className="category-icon-image"
                />
              </div>
              <div className="donation-card__category-label">
                <div className="label-text">{category.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
