import Categories from "../../component/category/Categories";
import CategoryHero from "../../component/category/CategoryHero";
import CategoryList from "../../component/category/CategoryList";
import Footer from "../../component/common/footer/Footer";
import Navbar from "../../component/common/navbar/Navbar";
import "../../style/scss/style.scss";
function CategoryPage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="layout__category-hero">
          <CategoryHero />
        </div>

        <div className="layout__main-container">
          <div className="layout__categort-page-left-panel">
            {/* 메인 배너 */}

            {/* 후원 리스트 */}

            <div className="layout__main-campaign-list">
              <CategoryList />
            </div>
          </div>
          <div className="layout__right-panel">
            <Categories />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default CategoryPage;
