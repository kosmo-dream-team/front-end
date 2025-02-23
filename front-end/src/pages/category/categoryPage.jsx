// src/pages/CategoryPage.jsx
import { useState } from "react";
import Categories from "../../component/category/Categories";
import CategoryHero from "../../component/category/CategoryHero";
import CategoryList from "../../component/category/CategoryList";
import Footer from "../../component/common/footer/Footer";
import Navbar from "../../component/common/navbar/Navbar";
import "@/style/scss/style.scss";

function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
