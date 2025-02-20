import useCampaignStore from "@/store/useCampaignStore";

export default function CampaignStatusMobile() {
  const { campaignStatus } = useCampaignStore();

  return (
    <div className="campaign-mobile">
      <div className="campaign-title">
        {campaignStatus.title ?? "병원비 걱정없이 치료받고 싶어요."}
      </div>
      <div className="progress-wrapper">
        <div className="progress-text-wrapper">
          <div className="progress-percent">
            {campaignStatus.currentAmount && campaignStatus.targetAmount
              ? (campaignStatus.currentAmount / campaignStatus.targetAmount) *
                100
              : 29}
            %
          </div>
          <div className="campaign-d-day">
            {campaignStatus.endDate ?? "D-79"}
          </div>
        </div>
        <div className="progress-bar-wrapper">
          <progress
            className="progress-bar-mobile"
            value={campaignStatus.currentAmount ?? 29}
            max={campaignStatus.targetAmount ?? 100}
          />
        </div>
      </div>
      <div className="amount-wrapper">
        <div className="current-amount">
          {campaignStatus.currentAmount ?? "1,200,000원"}
        </div>
        <div className="target-amount">
          {campaignStatus.targetAmount ?? "4,120,000원 목표"}
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
          <div className="like-count">{campaignStatus.likeCount ?? 256}</div>
        </div>
        <div className="vertical-divider"></div>
        <div className="share-wrapper">
          <div className="share-img"></div>
          <div className="share-count">{campaignStatus.shareCount ?? 50}</div>
        </div>
      </div>
      <div className="donate-btn-mobile">기부하기</div>
    </div>
  );
}
