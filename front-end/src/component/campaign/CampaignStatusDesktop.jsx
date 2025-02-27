import Kakaopay from "@/assets/img/kakaopay-ico.png";
import LikeActiveImg from "@/assets/img/like-active.png";
import Likeimg from "@/assets/img/like.png";
import Tosspay from "@/assets/img/tosspay.png";
import useCampaignStore from "@/store/useCampaignStore";
import usePortOneStore from "@/store/usePortOneStore";
import Cookies from "js-cookie";
import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
import CampaignDonateModal from "./CampaignDonateModal";
import { nanumGothicFont } from "./font";
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

  const {
    campaignStatus,
    fetchCampaignStatus,
    donateCampaign,
    likeCampaign,
    shareCampaign,
  } = useCampaignStore();
  const { initInfo, paymentInfo, setPaymentInfo } = usePortOneStore();

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
    const { user_id } = JSON.parse(Cookies.get("userProfile"));

    if (!user_id) {
      alert("기부는 로그인 이후에 할 수 있습니다.");
      return;
    }

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
        channelKey = "channel-key-b8e410ae-a2d8-4caa-9e93-5d0a1edfb1bb";
        pg = "tosspay";
        break;
      // case "payco":
      //   channelKey = "channel-key-1abd4115-b089-4ba7-93ed-8c241f899b8f";
      //   pg = "payco";
      //   break;
      // case "nicepay":
      //   channelKey = "channel-key-74aa624f-f796-475a-b37f-532b6cc04b7e";
      //   pg = "nice_v2";
      //   break;
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
    const { user_id } = JSON.parse(Cookies.get("userProfile"));
    const { IMP } = window;
    IMP.init(initInfo.impKey);
    IMP.request_pay(paymentInfo, (rsp) => {
      if (rsp.success) {
        console.log("결제 성공!");
        donateCampaign(
          campaignStatus.projectId,
          user_id,
          parseInt(donationAmountRef.current.value || customDonation),
          "card"
        );
        let AddReceipt = confirm("영수증을 저장하시겠습니까?");
        if (AddReceipt) {
          generateReceipt(paymentInfo, campaignStatus);
        }

        // 회원의 이메일 정보 (userProfile.email)로 백엔드에 이메일 전송 요청
        fetchCampaignStatus(campaignStatus.projectId);
        setModalOpen(false);
        alert("결제가 성공적으로 완료되었습니다.");
        window.location.reload();
      } else {
        console.log("결제 실패!");
      }
    });
  }, [paymentInfo]);

  //영수증
  const generateReceipt = (paymentInfo, campaignStatus) => {
    const doc = new jsPDF();

    // 한글 커스텀 폰트 등록 (nanumGothicFont는 별도 파일에서 import한 Base64 문자열)
    doc.addFileToVFS("NanumGothic.ttf", nanumGothicFont);
    doc.addFont("NanumGothic.ttf", "NanumGothic", "normal");
    doc.setFont("NanumGothic");

    // 로고 이미지 추가 (logoBase64는 별도 파일에서 import한 Base64 문자열)
    // doc.addImage(logoBase64, 'PNG', 15, 10, 50, 25);

    // 헤더 배경 추가 (회색)
    doc.setFillColor(230, 230, 230);
    doc.rect(0, 40, 210, 30, "F");

    // 헤더 텍스트 중앙정렬
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("기부 영수증", 105, 60, { align: "center" });

    // 헤더 아래 구분선
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(10, 70, 200, 70);

    // 본문 내용 (중앙정렬)
    let startY = 80;
    const lineSpacing = 10;
    const centerX = 105; // A4용지 너비 210의 절반 값
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`캠페인: ${campaignStatus.title}`, centerX, startY, {
      align: "center",
    });
    doc.text(
      `기부 금액: ${paymentInfo.amount}원`,
      centerX,
      startY + lineSpacing,
      { align: "center" }
    );
    doc.text(
      `거래번호: ${paymentInfo.merchant_uid}`,
      centerX,
      startY + lineSpacing * 2,
      { align: "center" }
    );
    const currentDate = new Date().toLocaleString();
    doc.text(`결제일자: ${currentDate}`, centerX, startY + lineSpacing * 3, {
      align: "center",
    });

    // 감사 메시지 (중앙정렬)
    doc.setFontSize(16);
    doc.text("감사합니다.", centerX, startY + lineSpacing * 5, {
      align: "center",
    });

    // 푸터에 테두리 추가 (디자인 요소)
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.rect(10, 10, 190, doc.internal.pageSize.getHeight() - 20);

    // 푸터 텍스트 추가 (페이지 하단 중앙)
    doc.setFontSize(10);
    doc.setTextColor(100);
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.text("Powered by [Your Company]", centerX, pageHeight - 10, {
      align: "center",
    });

    // PDF 파일 다운로드 (파일명에 거래번호 포함)
    doc.save(`donation_receipt_${paymentInfo.merchant_uid}.pdf`);
    return doc.output("blob");
  };

  useEffect(() => {
    if (
      campaignStatus?.projectId &&
      Cookies.get(`like-${campaignStatus.projectId}`)
    ) {
      setLiked(true);
    }
  }, [campaignStatus?.projectId]);
  const like = () => {
    const userProfile = Cookies.get("userProfile");
    if (!userProfile || !JSON.parse(userProfile).user_id) {
      alert("좋아요는 로그인 이후에 가능합니다.");
      return;
    }
    if (Cookies.get(`like-${campaignStatus.projectId}`)) {
      alert("이미 좋아요를 누르신 캠페인입니다.");
    } else {
      likeCampaign(campaignStatus.projectId);
      Cookies.set(`like-${campaignStatus.projectId}`, "true", { expires: 1 });
      setLiked(true); // 좋아요 클릭 시 이미지 변경을 위한 상태 업데이트
      fetchCampaignStatus(campaignStatus.projectId);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었습니다.");
      shareCampaign(campaignStatus.projectId);
      fetchCampaignStatus(campaignStatus.projectId);
    } catch (error) {
      alert("복사에 실패했습니다!", error);
    }
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
          {campaignStatus.accumulatedDonation || 0}원
        </div>
        <div className="target-amount">
          {campaignStatus.targetAmount || 0}원 목표
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
