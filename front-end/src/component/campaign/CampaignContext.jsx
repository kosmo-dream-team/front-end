import Cookies from "js-cookie";
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

  const { campaignStatus, writeComment, likeComment } = useCampaignStore();
  const { userProfile } = useUserProfile();

  useEffect(() => {
    // 추천 댓글 클릭 시 해당 내용이 댓글 입력하는 곳에 업데이트 되는 기능
    const setCommentToRecommended = (e) => {
      const commentElement = document.getElementById("comment");
      if (commentElement) {
        commentElement.innerText = e.target.innerText;
      }
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

  function comment(e) {
    e.preventDefault();
    // 로그인 여부 확인
    if (userProfile && userProfile.user_name) {
      writeComment(
        parseInt(campaignId),
        userProfile.userId,
        document.getElementById("comment").textContent
      );
      alert("댓글 작성이 완료되었습니다.");
    } else {
      alert("댓글 작성은 로그인 이후에 가능합니다.");
    }
  }

  function like(commentId) {
    console.log(commentId);
    if (Cookies.get(`like-${commentId}`)) {
      alert("이미 좋아요를 누르신 댓글입니다.");
    } else {
      likeComment(commentId);
      Cookies.set(`like-${commentId}`, "true", { expires: 1 });
    }
  }

  return (
    <div className="context-wrapper">
      <CampaignStatus />

      <div className="donation-overview">
        <div className="overview-text">
          <b>드림온</b> 외 <b>{campaignStatus.donorCount}</b>명의 이름으로{" "}
          <b>{campaignStatus.accumulatedDonation}</b>원을 지원합니다.
        </div>
      </div>
      <div className="fundraising-period">
        모금기간 {campaignStatus.startDate} ~ {campaignStatus.endDate}
      </div>

      <div className="content-wrapper">{campaignStatus.description}</div>

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
                style={{
                  backgroundImage: "url(" + donor.profileImage + ")",
                  marginBottom: "0.4rem",
                }}
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
            <div className="comment-btn" onClick={(e) => comment(e)}>
              댓글 작성
            </div>
          </div>
          <div className="comment-recommend-wrapper">
            {/* 버튼 클릭 시 해당 텍스트가 댓글 입력란에 업데이트 됩니다 */}
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
                campaignStatus.commentList.length > 0
                  ? campaignStatus.commentList.map((comment, index) => (
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
                          <div
                            className="comment-like-wrapper"
                            onClick={() => like(comment.commentId)}
                          >
                            <div className="comment-like-img" />
                            {comment.likeCount}
                          </div>
                          <div className="comment-post-date">
                            {comment.postDate}
                          </div>
                        </div>
                      </div>
                    ))
                  : "" /* 댓글이 없으면 아무것도 출력하지 않음 */
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignContext;
