import React from 'react';
import Header from "../../component/main/header";
import { Campain1 } from '../../component/main/campain1';
import Category from '../../component/main/category';
import "../../style/scss/style.scss";

function mainPage(){
  return (
    <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
      <div className="layout__header">
        <Header /></div>
    <div className="layout__main-container">
      <div className="layout__left-panel">
        {/* 메인 배너너 */}
    <div className="layout__main-banner">컴포넌트 꽂는곳</div>
    {/* 나의 도움이 필요한 모금함(카테고리) */ }
    <div className="layout__my-help-category"></div>
    {/* 가장 많이 기부중인 모금함 */}
    <div className="layout__top-campaign">컴포넌트 꽂는곳123123</div>

    {/* 후원 리스트 */}
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
  );
};

export default mainPage;



