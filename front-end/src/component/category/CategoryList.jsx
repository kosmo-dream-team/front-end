import baby1 from "../../assets/img/baby1.jpg";
import "../../style/scss/style.scss";
export default function CategoryList() {
  return (
    <>
      <div className="main-campaign-list">
        <div
          className="layout__main-campaign-list__content"
          style={{ backgroundImage: `url(${baby1})` }}
        >
          <div className="main-campaign-list__title">
            <div className="main-campaign-list__category">
              <div className="main-campaign-list__category-text">
                아동 / 청소년
              </div>
            </div>
            <div className="main-campaign-list__quote">
              “ 예비 초등학생에게 책가방을 보내주세요sd ”
            </div>
            <div className="main-campaign-list__beneficiary">
              <div className="main-campaign-list__beneficiary-text">
                수혜as자명
              </div>
            </div>
          </div>
          <div className="main-campaign-list__deadline">
            <div className="main-campaign-list__deadline-text">D-16</div>
          </div>
        </div>
        <div className="main-campaign-list__progress-wrapper">
          <div className="main-campaign-list__progress-bar">
            <div className="main-campaign-list__progress-fill" />
          </div>
          <div className="abc2222">
            <div className="main-campaign-list__progress-percent">33%</div>
            <div className="main-campaign-list__amount">1,920,999 원</div>
          </div>
        </div>
      </div>
    </>
  );
}
