import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import "@/style/scss/style.scss";

import CampaignStatus from "@/component/campaign/CampaignStatus";

import useCampaignStore from "@/store/useCampaignStore";
import useUserProfile from "@/store/useUserProfile";

const CampaignContext = () => {
  const { campaignId } = useParams(); // 페이지 URL의 campaignId를 가져옴

  const recommendRef1 = useRef(null);
  const recommendRef2 = useRef(null);
  const recommendRef3 = useRef(null);

  const { campaignStatus, writeComment } = useCampaignStore();

  const { userProfile } = useUserProfile();

  useEffect(() => {
    // 추천 댓글 클릭 시 해당 내용이 댓글 입력하는 곳에 업데이트 되는 기능
    const setCommentToRecommended = (recommend) => {
      document.getElementById("comment").innerText = recommend.target.innerText;
    };

    if (recommendRef1.current)
      recommendRef1.current.addEventListener("click", setCommentToRecommended);
    if (recommendRef2.current)
      recommendRef2.current.addEventListener("click", setCommentToRecommended);
    if (recommendRef3.current)
      recommendRef3.current.addEventListener("click", setCommentToRecommended);

    return () => {
      if (recommendRef1.current)
        recommendRef1.current.removeEventListener(
          "click",
          setCommentToRecommended
        );
      if (recommendRef2.current)
        recommendRef2.current.removeEventListener(
          "click",
          setCommentToRecommended
        );
      if (recommendRef3.current)
        recommendRef3.current.removeEventListener(
          "click",
          setCommentToRecommended
        );
    };
  }, []);

  function comment() {
    // if (login) { // 로그인이 되었는 지 확인
    //================================================================================================
    // 기부할 경우에는 user_name != null 로 확인하도록 수정했습니다. loginstore 삭제
    //================================================================================================
    //   writeComment(campaignId, userProfile.userId, document.getElementById("comment").textContent); // 로그인이 되었다면 댓글 작성 함수 호출
    //   alert("댓글 작성이 완료되었습니다.");
    // }
    // else alert("댓글 작성은 로그인 이후에 가능합니다."); // 로그인이 되지 않았다면 alert 호출

    writeComment(
      parseInt(campaignId),
      1,
      document.getElementById("comment").textContent
    );
    alert("댓글 작성이 완료되었습니다.");
  }

  return (
    <div className="context-wrapper">
      <CampaignStatus />

      <div className="donation-overview">
        <div className="overview-text">
          드림온 외 {campaignStatus.donorCount}명의 이름으로 소아암 환자 1명에게{" "}
          {campaignStatus.accumulatedDonation}원을 지원합니다.
        </div>
      </div>
      <div className="fundraising-period">
        모금기간 {campaignStatus.startDate} ~ {campaignStatus.endDate}
      </div>

      <div className="category-list-wrapper">
        <div className="category-list">
          {campaignStatus.categoryList.map((category, index) => (
            <div className="category" key={index}>
              #{category.categoryName}
            </div>
          ))}
        </div>
      </div>

      <div className="donor-list-wrapper">
        <div className="donor-count-wrapper">
          <div className="donor-text">기부 발자국</div>
          <div className="donor-count">총 {campaignStatus.donorCount}명</div>
        </div>
        <div className="donor-list">
          {campaignStatus.donorList.map((donor, index) => (
            <div className="donor-wrapper" key={index}>
              <div
                className="donor-img"
                style={{ backgroundImage: "url(" + donor.profileImage + ")" }}
              />
              <div className="donor-name">{donor.donorName}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="comment-section-wrapper">
        <div className="commenting-section">
          <div className="comment-text">따뜻한 댓글을 남겨주세요</div>
          <div className="comment-write-wrapper">
            <div
              id="comment"
              className="comment"
              contentEditable
              data-text="댓글 남기기"
            />
            <div
              className="comment-btn"
              onClick={() => {
                event.preventDefault();
                comment();
              }}
            >
              댓글 작성
            </div>
          </div>
          <div className="comment-recommend-wrapper">
            {/* 버튼 클릭 시 댓글의 내용을 클릭한 버튼의 텍스트로 변경 setCommentToRecommended(this.innerText) */}
            <div
              id="recommend-1"
              className="comment-recommend"
              ref={recommendRef1}
            >
              응원합니다.
            </div>
            <div
              id="recommend-2"
              className="comment-recommend"
              ref={recommendRef2}
            >
              우리 함께 합시다!
            </div>
            <div
              id="recommend-3"
              className="comment-recommend"
              ref={recommendRef3}
            >
              함께 참여해주세요.
            </div>
          </div>
        </div>
        <div className="comment-section">
          <div className="comment-count">
            댓글{campaignStatus.commentList.length}개
          </div>
          <div className="comment-list-wrapper">
            <div className="comment-list">
              {
                campaignStatus.commentList.length > 0 // 댓글이 달렸는 지 확인
                  ? campaignStatus.commentList.map(
                      (
                        comment,
                        index // 달린 댓글이 있다면 댓글 목록 출력
                      ) => (
                        <div className="comment-wrapper" key={index}>
                          <div className="comment-img-wrapper">
                            <div
                              className="user-img"
                              style={{
                                backgroundImage:
                                  "url(/src/assets/img/" +
                                  comment.profileImage +
                                  ")",
                              }}
                            />
                            <div className="comment-content-wrapper">
                              <div className="comment-name">
                                {comment.userName}
                              </div>
                              <div className="comment-content">
                                {comment.comment}
                              </div>
                            </div>
                          </div>
                          <div className="comment-info-wrapper">
                            <div className="comment-like-wrapper">
                              <div className="comment-like-img" />
                              {comment.likeCount}
                            </div>
                            <div className="comment-post-date">
                              {comment.postDate}
                            </div>
                          </div>
                        </div>
                      )
                    )
                  : "" /* 달린 댓글이 없다면 아무것도 출력하지 않음 */
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignContext;
