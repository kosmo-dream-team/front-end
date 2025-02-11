import MainBanner from "../../assets/img/main-banner1.png";
import Footer from "../../component/common/footer/Footer";
import Navbar from "../../component/common/navbar/Navbar";
import Card2 from "../../component/main/Card2";
import Card3 from "../../component/main/Card3";
import Card4 from "../../component/main/card4";
import Card5 from "../../component/main/Card5";
import MainCampaignList from "../../component/main/MainCampaignList";
import MainCategory from "../../component/main/MainCategory";
import PopularCampaign from "../../component/main/PopularCampaign";
import TotalDonation from "../../component/main/TotalDonation";
import "../../style/scss/style.scss";
function MainPage() {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <div className="layout__main-container">
        <div className="layout__left-panel">
          {/* 메인 배너너 */}
          <div className="layout__main-banner">
            <a href="/">
              <img src={MainBanner} alt="" style={{ width: "100%" }} />
            </a>
          </div>
          {/* 나의 도움이 필요한 모금함(카테고리) */}
          <div className="layout__main-category">
            <MainCategory />
          </div>
          {/* 가장 많이 기부중인 모금함 */}
          <div className="layout__top-campaign">
            <PopularCampaign />
          </div>

          {/* 후원 리스트 */}
          <div className="layout__main-campaign-list">
            <MainCampaignList />
          </div>
        </div>
        <div className="layout__right-panel">
          <div className="layout__first-section">
            <div className="layout__total-donation">
              <TotalDonation />
            </div>
            <div className="layout__donation-review">
              <Card2 />
            </div>
          </div>

          <div className="layout__new-campaign">
            <Card3 />
          </div>
          <div className="layout__social-link">
            <Card4 />
          </div>

          <div className="layout__receive-donation">
            <Card5 />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
