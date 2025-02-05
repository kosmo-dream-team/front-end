import React from 'react';
import "../.././style/scss/style.scss";

const DonationInfo = () => {
  return (
    <div className="donation-info">
      <div className="donation-amount">1,000원</div>
      <div className="total-donation">총후원금액</div>
      <div className="my-amount">0원</div>
      <div className="my-balance">나의 보유금액</div>
    </div>
  );
};

export default DonationInfo;
