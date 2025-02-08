import "../../style/scss/style.scss";


function CategoryPage() {
return(
<>
<div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
      <div className="layout__header">컴포넌트</div>
      <div className="layout__category-hero">컴포넌트 꽂는곳</div>
      <div className="layout__categories">카테고리 꽂는곳</div>
    <div className="layout__main-container">
      <div className="layout__left-panel">
        {/* 메인 배너 */}
 
    {/* 후원 리스트 */}
    <div ></div>
    <div className="layout__main-campaign-list">컴포넌트 꽂는곳</div>
    

      </div>
      <div className="layout__right-panel">
        <div className='layout__first-section'>
    <div className="layout__total-donation"> 
      컴포넌트 꽂는곳</div>
    <div className="layout__donation-review"> 
    컴포넌트 꽂는곳</div>
    </div>
    <div className="layout__new-campaign">
    컴포넌트 꽂는곳
    </div>
    <div className="layout__social-link">
    컴포넌트 꽂는곳
    </div>

    <div className="layout__receive-donation">컴포넌트 꽂는곳</div>
      </div>
  </div></div>
</>

);
}

export default CategoryPage;