import { useEffect, useRef, useState } from "react";

import CampaignDonateModal from "./CampaignDonateModal";

import useCampaignStore from "@/store/useCampaignStore";
import usePortOneStore from "@/store/usePortOneStore";
import useUserProfile from "@/store/useUserProfile";

export default function CampaignStatusDesktop() {
  const statusRef = useRef(); // 최초 좌표를 가져오기 위한 useRef
  const [defaultY, setDefaultY] = useState(0); // 최초 좌표 값 저장
  const [scrollY, setScrollY] = useState(0); // 스크롤 한 Y좌표 저장

  const [modalOpen, setModalOpen] = useState(false);
  const donationAmountRef = useRef();
  const [preventFirstRender, setPreventFirstRender] = useState(true);

  const { campaignStatus, donateCampaign } = useCampaignStore();
  const { initInfo, paymentInfo, setPaymentInfo } = usePortOneStore();

  const { userProfile } = useUserProfile();

  useEffect(() => {
    // 최초 좌표 값 가져오기
    setDefaultY(statusRef.current.offsetTop);

    // 스크롤이 될 때 마다 기본 좌표 + 스크롤 된 좌표를 계산하는 함수를 스크롤 이벤트에 할당
    window.addEventListener("scroll", handleScroll);

    // 포트원 결제 API SDK 추가
    const script = document.createElement("script"); // 스크립트 태그 생성
    script.src = "https://cdn.iamport.kr/v1/iamport.js"; // 생성한 태그의 src 값 설정
    document.head.appendChild(script); // <head> 태그의 자식으로 생성한 <script> 태그 추가
    script.onload = () => {
      console.log("포트원 스크립트 동적 생성 완료!");
    }; // 태그가 정상적으로 추가되었는 지 확인을 위한 로그

    return () => {
      window.removeEventListener("scroll", handleScroll); // 스크롤 이벤트 리스너 삭제
      script.remove(); // 동적 생성한 포트원 스크립트 삭제
    };
  }, []);

  // state로 스크롤 된 y 값을 바꾸면 기본 좌표 + 스크롤 된 좌표(0 ~ ???)값을 더해 위치가 자동 변경된다.
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  // 포트원 결제 설정 함수
  const donate = () => {
    // if (!login) { // 로그인이 되었는 지 확인
    //================================================================================================
    // 기부할 경우에는 user_name != null 로 확인하도록 수정했습니다. loginstore 삭제
    //================================================================================================
    //   alert("댓글 작성은 로그인 이후에 가능합니다.");
    //   return;
    // }

    // 1. 입력된 기부 금액 값이 없다면 return 처리
    if (
      donationAmountRef.current.value == "" ||
      donationAmountRef.current.value <= 0
    ) {
      alert("기부 금액을 입력해주세요.");
      return;
    }

    // 2. 결제 요청할 값 설정
    const timestamp = Date.now(); // 항상 유니크해야하는 merchant_uid를 위해 타임스탬프 생성

    setPaymentInfo({
      merchant_uid: `donate-${timestamp}`,
      name: campaignStatus.title,
      amount: parseInt(donationAmountRef.current.value),
    });
  };

  useEffect(() => {
    // setPaymentInfo 함수가 값을 바꾼 이후 결제가 이루어져야 해서 paymentInfo의 변화를 추적
    if (preventFirstRender) {
      // 첫 번째 값 변경(페이지 렌더링)일 경우는 실행하지 않게 처리
      setPreventFirstRender(false); // 이후의 paymentInfo 변경은 값 입력 후 기부 버튼이 클릭되는 것이므로 false 처리
      return;
    }

    // 포트원 SDK 초기화
    const { IMP } = window; // 동적으로 추가한 스크립트 처리
    IMP.init(initInfo.impKey); // store에서 키 값을 가져와 포트원 SDK 초기화(※ 두 번 이상 호출 금지 ※)

    // 결제 요청
    IMP.request_pay(paymentInfo, (rsp) => {
      // callback 함수
      if (rsp.success) {
        // 결제 성공 시
        console.log("결제 성공!");
        // donateCampaign(campaignStatus.projectId, userProfile.userId, parseInt(donationAmountRef.current.value), "card");
        donateCampaign(
          campaignStatus.projectId,
          1,
          parseInt(donationAmountRef.current.value),
          "card"
        );
      } else {
        // 결제 실패 시
        console.log("결제 실패!");
      }
    });
  }, [paymentInfo]);

  const like = () => {
    console.log("좋아요 함수");
  };

  return (
    <div
      className="campaign-desktop"
      ref={statusRef}
      style={{ top: `${defaultY + scrollY}px` }}
    >
      <div className="campaign-title">{campaignStatus.title}</div>
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
      <div className="amount-wrapper">
        <div className="current-amount">
          {campaignStatus.accumulatedDonation}원
        </div>
        <div className="target-amount">
          {campaignStatus.targetAmount}원 목표
        </div>
      </div>
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
      <div className="like-and-share-wrapper">
        <div className="like-wrapper" onClick={() => like()}>
          <div className="like-img"></div>
          <div className="like-count">{campaignStatus.likeCount}</div>
        </div>
        <div className="vertical-divider"></div>
        <div className="share-wrapper">
          <div className="share-img"></div>
          <div className="share-count">{campaignStatus.shareCount}</div>
        </div>
      </div>
      <div className="donate-btn" onClick={() => setModalOpen(true)}>
        기부하기
      </div>

      <CampaignDonateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        {/* children */}
        <div>
          <p>{campaignStatus.title} 캠페인에 기부하실 금액을 입력해주세요.</p>
          <div>
            <label htmlFor="donationAmount">기부 금액</label>
            <input id="donationAmount" type="number" ref={donationAmountRef} />
            <button id="donate" onClick={() => donate()}>
              기부하기
            </button>
          </div>
        </div>
      </CampaignDonateModal>
    </div>
  );
}
