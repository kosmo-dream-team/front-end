import Kakaopay from "@/assets/img/kakaopay-ico.png";
import LikeActiveImg from "@/assets/img/like-active.png";
import Likeimg from "@/assets/img/like.png";
import Tosspay from "@/assets/img/tosspay.png";
import useCampaignStore from "@/store/useCampaignStore";
import usePortOneStore from "@/store/usePortOneStore";
import useUserProfile from "@/store/useUserProfile";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import CampaignDonateModal from "./CampaignDonateModal";

export default function CampaignStatusDesktop() {
  const statusRef = useRef();
  const [defaultY, setDefaultY] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const donationAmountRef = useRef();
  const [preventFirstRender, setPreventFirstRender] = useState(true);
  // selectPG: 선택된 PG 채널 (예: "kakaopay", "tosspay", "payco", "nicepay")
  const [selectPG, setSelectPG] = useState("kakaopay");

  // 추가된 결제 옵션/금액 관련 state
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("option1");
  const [selectedPresetAmount, setSelectedPresetAmount] = useState(null);
  const [customDonation, setCustomDonation] = useState("");

  // 좋아요 여부를 관리하는 state
  const [liked, setLiked] = useState(false);

  const { campaignStatus, donateCampaign, likeCampaign, shareCampaign } =
    useCampaignStore();
  const { initInfo, paymentInfo, setPaymentInfo } = usePortOneStore();
  const { userProfile } = useUserProfile();

  useEffect(() => {
    setDefaultY(statusRef.current.offsetTop);
    window.addEventListener("scroll", handleScroll);

    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(script);
    script.onload = () => {
      console.log("포트원 스크립트 동적 생성 완료!");
    };

    return () => {
      window.removeEventListener("scroll", handleScroll);
      script.remove();
    };
  }, []);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const donate = () => {
    const donationValue =
      donationAmountRef.current?.value || customDonation || 0;
    if (donationValue === "" || donationValue <= 0) {
      alert("기부 금액을 입력해주세요.");
      return;
    }

    let channelKey;
    let pg;
    switch (selectPG) {
      case "kakaopay":
        channelKey = "channel-key-ee27fa89-f49b-414d-81e5-b8f57e614c5e";
        pg = "kakaopay";
        break;
      case "tosspay":
        channelKey = "channel-key-890a0a6b-7bb2-4a13-824b-99e302e1c804";
        pg = "tosspay";
        break;
      case "payco":
        channelKey = "channel-key-1abd4115-b089-4ba7-93ed-8c241f899b8f";
        pg = "payco";
        break;
      case "nicepay":
        channelKey = "channel-key-74aa624f-f796-475a-b37f-532b6cc04b7e";
        pg = "nice_v2";
        break;
      default:
        break;
    }

    const timestamp = Date.now();
    setPaymentInfo({
      channelKey: channelKey,
      merchant_uid: `donate-${timestamp}`,
      name: campaignStatus.title,
      amount: parseInt(donationValue),
      pg: pg,
    });
  };

  useEffect(() => {
    if (preventFirstRender) {
      setPreventFirstRender(false);
      return;
    }
    const { IMP } = window;
    IMP.init(initInfo.impKey);
    IMP.request_pay(paymentInfo, (rsp) => {
      if (rsp.success) {
        console.log("결제 성공!");
        donateCampaign(
          campaignStatus.projectId,
          1,
          parseInt(donationAmountRef.current.value || customDonation),
          "card"
        );
      } else {
        console.log("결제 실패!");
      }
    });
  }, [paymentInfo]);

  const like = () => {
    if (liked) {
      alert("이미 좋아요를 누르신 캠페인입니다.");
    } else {
      likeCampaign(campaignStatus.projectId);
      setLiked(true);
      Cookies.set("like", "true", { expires: 1 });
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었습니다.");
      shareCampaign(campaignStatus.projectId);
    } catch (error) {
      alert("복사에 실패했습니다!", error);
    }
  };

  const changePG = (event) => {
    setSelectPG(event.target.value);
  };

  // 프리셋 금액 선택 함수
  const handlePresetAmount = (amount) => {
    setSelectedPresetAmount(amount);
    setCustomDonation(amount);
    if (donationAmountRef.current) {
      donationAmountRef.current.value = amount;
    }
  };

  return (
    <div
      className="campaign-desktop"
      ref={statusRef}
      style={{ top: `${defaultY + scrollY}px` }}
    >
      {/* 진행률 표시 영역 */}
      <div className="progress-wrapper">
        <div className="progress-text-wrapper">
          <div className="progress-percent">{campaignStatus.donationRate}%</div>
          <div className="campaign-d-day">
            {campaignStatus.daysLeft >= 0
              ? "D-" + campaignStatus.daysLeft
              : "기간만료"}
          </div>
        </div>
        <div className="progress-bar-wrapper">
          <progress
            className="progress-bar"
            value={campaignStatus.accumulatedDonation}
            max={campaignStatus.targetAmount}
          />
        </div>
      </div>

      {/* 금액 정보 영역 */}
      <div className="amount-wrapper">
        <div className="current-amount">
          {campaignStatus.accumulatedDonation || 10041004}원
        </div>
        <div className="target-amount">
          {campaignStatus.targetAmount || 10041004}원 목표
        </div>
      </div>

      {/* 혜택 및 모금 전달 안내 */}
      <div className="info-wrapper">
        <p className="list-header">세제 혜택 안내</p>
        <ul className="info-list">
          <li>일반기부금</li>
          <li>2025년 연말정산 대상</li>
        </ul>
        <p className="list-header">모금 전달 안내</p>
        <ul className="info-list">
          <li>모금 종료시 전액 일시 전달</li>
        </ul>
      </div>

      {/* 좋아요 및 공유 영역 */}
      <div className="like-and-share-wrapper">
        <div className="like-wrapper" onClick={() => like()}>
          <div className="">
            <img
              src={liked ? LikeActiveImg : Likeimg}
              alt=""
              style={{
                width: "2rem",
                height: "2rem",
              }}
            />
          </div>
          <div className="like-count">{campaignStatus.likeCount}</div>
        </div>
        <div className="vertical-divider"></div>
        <div
          className="share-wrapper"
          onClick={() =>
            copyToClipboard(
              `http://localhost:5173/campaign/${campaignStatus.projectId}`
            )
          }
        >
          <div className="share-img"></div>
          <div className="share-count">{campaignStatus.shareCount}</div>
        </div>
      </div>

      {/* 기부 버튼 */}
      <div className="donate-btn" onClick={() => setModalOpen(true)}>
        기부하기
      </div>

      {/* 기부/결제 모달 */}
      <CampaignDonateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div className="payment-container">
          {/* 결제 수단 옵션 */}

          <div
            className="payment-option option-2 reset-btn"
            onClick={() => {
              setSelectedPaymentOption("option2");
              setSelectPG("tosspay");
            }}
          >
            <div className="option-bg option-2-bg"></div>
            <div
              className={`option-circle option-2-circle ${
                selectedPaymentOption === "option2" ? "active-circle" : ""
              }`}
            ></div>
            <img
              className="option-img option-2-img"
              src={Tosspay}
              alt="Tosspay"
            />
          </div>
          <div
            className="payment-option option-4 reset-btn"
            onClick={() => {
              setSelectedPaymentOption("option4"); // "option1"에서 "option4"로 수정
              setSelectPG("kakaopay");
            }}
          >
            <div className="option-bg option-4-bg"></div>
            <img
              className="option-img option-4-img"
              src={Kakaopay}
              alt="Kakaopay" // alt 텍스트 수정
            />
            <div
              className={`option-circle option-4-circle ${
                selectedPaymentOption === "option4" ? "active-circle" : ""
              }`}
            ></div>
          </div>

          <div className="payment-title">결제 수단을 선택해주세요</div>
          {/* 프리셋 금액 선택 버튼 */}
          <div
            className={`payment-amount payment-amount-3000 ${
              selectedPresetAmount === 3000 ? "active-amount" : ""
            }`}
          >
            <button
              className="amount-value"
              onClick={() => handlePresetAmount(3000)}
            >
              <span className="amount-number">3000</span>
              <span className="amount-currency">원</span>
            </button>
          </div>
          <div
            className={`payment-amount payment-amount-5000 ${
              selectedPresetAmount === 5000 ? "active-amount" : ""
            }`}
          >
            <button
              className="amount-value"
              onClick={() => handlePresetAmount(5000)}
            >
              <span className="amount-number">5000</span>
              <span className="amount-currency">원</span>
            </button>
          </div>
          <div
            className={`payment-amount payment-amount-10000 ${
              selectedPresetAmount === 10000 ? "active-amount" : ""
            }`}
          >
            <button
              className="amount-value"
              onClick={() => handlePresetAmount(10000)}
            >
              <span className="amount-number">10000</span>
              <span className="amount-currency">원</span>
            </button>
          </div>
          <div className="input-title">결제할 금액을 입력해주세요</div>
          <input
            type="number"
            className="input-box"
            id="donationAmount"
            ref={donationAmountRef}
            value={customDonation}
            onChange={(e) => setCustomDonation(e.target.value)}
          />
          <div className="input-label">금액 직접 입력하기</div>
          <button className="submit-button-bg" onClick={() => donate()}>
            결제하기
          </button>
        </div>
      </CampaignDonateModal>
    </div>
  );
}
