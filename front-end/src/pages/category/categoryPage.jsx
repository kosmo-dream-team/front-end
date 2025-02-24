import "@/style/scss/style.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Categories from "../../component/category/Categories";
import CategoryHero from "../../component/category/CategoryHero";
import CategoryList from "../../component/category/CategoryList";
import Footer from "../../component/common/footer/Footer";
import Navbar from "../../component/common/navbar/Navbar";

function CategoryPage() {
  // URL 쿼리 파라미터를 읽어 초기 선택된 카테고리 결정 ("전체"가 기본)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("selectedCategory") || "전체";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // 선택된 카테고리가 변경되면 URL 쿼리 파라미터 업데이트 (정렬은 "date" 고정)
  useEffect(() => {
    setSearchParams({ selectedCategory, sort: "date" });
  }, [selectedCategory, setSearchParams]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="layout__category-hero">
          <CategoryHero selectedCategory={selectedCategory} />
        </div>
        <div className="layout__main-container">
          <div className="layout__categort-page-left-panel">
            <div className="layout__main-campaign-list">
              <CategoryList selectedCategory={selectedCategory} />
            </div>
          </div>
          <div className="layout__right-panel">
            <div className="categories-container"></div>
            <Categories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default CategoryPage;
