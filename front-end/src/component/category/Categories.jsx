import categoriesIcon from "@/assets/img/categories-icon.png";
import "@/style/scss/style.scss";

export default function Categories() {
  return (
    <>
      <div className="categories-container">
        <div className="categories-title">
          마음이 움직이는
          <br /> 주제를 선택하세요.
        </div>

        <div>
          <button className="all-categories-items">
            <img src={categoriesIcon} alt="" className="all-categories-icon" />
            <div className="all-categories-label-wrapper">
              <span className="all-categories-label">전체로 보기 </span>
              <div className="all-categories-sub-label">12,522건 참여중</div>
            </div>
          </button>
          <div className="categories-subtitle">아동ㆍ청소년</div>
          <button className="categories-items">
            <img src={categoriesIcon} alt="" className="categories-icon" />
            <div className="categories-label-wrapper">
              <span className="categories-label">자립준비청년지원</span>
              <div className="categories-sub-label">12,522건 참여중</div>
            </div>
          </button>
        </div>
        <div>
          <div className="categories-subtitle">아동ㆍ청소년</div>
          <button className="categories-items">
            <img src={categoriesIcon} alt="" className="categories-icon" />
            <div className="categories-label-wrapper">
              <span className="categories-label">자립준비청년지원</span>
              <div className="categories-sub-label">12,522건 참여중</div>
            </div>
          </button>
        </div>
        <div>
          <div className="categories-subtitle">아동ㆍ청소년</div>
          <button className="categories-items">
            <img src={categoriesIcon} alt="" className="categories-icon" />
            <div className="categories-label-wrapper">
              <span className="categories-label">자립준비청년지원</span>
              <div className="categories-sub-label">12,522건 참여중</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
