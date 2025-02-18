import { useEffect, useRef, useState } from "react";

import useCampaignStore from "@/store/useCampaignStore";

export default function CampaignStatusDesktop() {
  const statusRef = useRef(); // 최초 좌표를 가져오기 위한 useRef
  const [defaultY, setDefaultY] = useState(0); // 최초 좌표 값 저장
  const [scrollY, setScrollY] = useState(0); // 스크롤 한 Y좌표 저장

  const { campaignStatus } = useCampaignStore();

  useEffect(() => {
    // 최초 좌표 값 가져오기
    setDefaultY(statusRef.current.offsetTop);

    // 스크롤이 될 때 마다 기본 좌표 + 스크롤 된 좌표를 계산하는 함수를 스크롤 이벤트에 할당
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // state로 스크롤 된 y 값을 바꾸면 기본 좌표 + 스크롤 된 좌표(0 ~ ???)값을 더해 위치가 자동 변경된다.
  const handleScroll = () => {
    setScrollY(window.scrollY);
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
          <div className="campaign-d-day">D-{campaignStatus.daysLeft}</div>
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
        <div className="like-wrapper">
          <div className="like-img"></div>
          <div className="like-count">{campaignStatus.likeCount}</div>
        </div>
        <div className="vertical-divider"></div>
        <div className="share-wrapper">
          <div className="share-img"></div>
          <div className="share-count">
            {/* {campaignStatus.shareCount} */}50
          </div>
        </div>
      </div>
      <div className="donate-btn">기부하기</div>
    </div>
  );
}
