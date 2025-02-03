import React from 'react';

 import "../../style/scss/style.scss";
function mainPage(){
  return (
    <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
      <div className="header">123123</div>
    <div className="main-container">
      <div className="left-panel">
        {/* 메인 배너너 */}
    <div className="main-banner">123</div>
    {/* 나의 도움이 필요한 모금함(카테고리) */ }
    <div className="my-help-category">123</div>
    {/* 가장 많이 기부중인 모금함 */}
    <div className="top-campaign">123</div>

    {/* 후원 리스트 */}
    <div className="main-campaign-list">123</div>
    

      </div>
      <div className="right-panel">
        <div className='first-section'>
    <div className="total-donation"> 
      12</div>
    <div className="donation-review"> 
     12 </div>
    </div>
    <div className="new-campaign">
      123
    </div>
    <div className="social-link">
      123123123
    </div>

    <div className="receive-donation">123</div>
      </div>
  </div></div>
  );
};

export default mainPage;
