import logo from "@/assets/img/logo3.png";
export default function TotalDonation() {
  return (
    <>
      <div className="total-donation">
        <div className="total-donation-title">
          <div className="total-donation-title-text">
            <div>
              우리가 함께 만든
              <br />
              아름다운 변화들 <br />
              <div className="total-donation-title-date">2025.02.18 기준</div>
            </div>
          </div>
          <div>
            <img src={logo} alt="" className="total-donation-title-img" />
          </div>
        </div>
        <div className="total-donation-donation-box">
          총 기부금{" "}
          <span className="total-raised-donation"> 1,000,000,000원</span>
        </div>
      </div>
    </>
  );
}
