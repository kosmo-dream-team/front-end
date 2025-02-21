// TotalDonation.jsx
import logo from "@/assets/img/logo3.png";
import { useEffect } from "react";
import useStateStore from "../../store/useStateStore";

export default function TotalDonation() {
  const { totalDonationAmount, fetchStatistics } = useStateStore();

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return (
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
          <img src={logo} alt="logo" className="total-donation-title-img" />
        </div>
      </div>
      <div className="total-donation-donation-box">
        총 기부금{" "}
        <span className="total-raised-donation">{totalDonationAmount}원</span>
      </div>
    </div>
  );
}
