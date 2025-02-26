import DefaultUserImg from "@/assets/img/default-user-img.svg";
import LikeActiveImg from "@/assets/img/like-active.png";
import Likeimg from "@/assets/img/like.png";
import CampaignStatus from "@/component/campaign/CampaignStatus";
import useCampaignStore from "@/store/useCampaignStore";
import useUserProfile from "@/store/useUserProfile";
import "@/style/scss/style.scss";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const IMAGE_BASE_URL = "http://localhost:8586/images/";
const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

// 이미지가 파일명 형태이면 기본 경로를 붙여 전체 URL로 반환하는 함수
const getImageUrl = (image) => {
  if (
    typeof image === "string" &&
    supportedExtensions.some((ext) => image.toLowerCase().endsWith(ext)) &&
    !image.startsWith("http")
  ) {
    return IMAGE_BASE_URL + image;
  }
  return image;
};

const CampaignContext = () => {
  const { campaignId } = useParams(); // 페이지 URL의 campaignId를 가져옴

  const recommendRef1 = useRef(null);
  const recommendRef2 = useRef(null);
  const recommendRef3 = useRef(null);

  const { campaignStatus, fetchCampaignStatus, writeComment, likeComment } =
    useCampaignStore();
  // 수정: userProfile 대신 스토어의 profile 속성을 가져옵니다.
  const { profile } = useUserProfile();

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
    //로그인 여부 확인 (profile 사용)
    if (profile && profile.user_name) {
      const commentBox = document.getElementById("comment");
      const commentContent = commentBox.textContent;
      writeComment(parseInt(campaignId), profile.user_id, commentContent);
      fetchCampaignStatus(campaignId);
      //댓글 작성 후 댓글창 초기화
      commentBox.textContent = "";
    } else {
      alert("댓글 작성은 로그인 이후에 가능합니다.");
    }
  }

  function like(commentId) {
    // 로그인 상태가 아니라면 좋아요를 누를 수 없습니다.
    if (!(profile && profile.user_name)) {
      alert("좋아요는 로그인 이후에 가능합니다.");
      return;
    }

    if (Cookies.get(`like-comment-${commentId}`)) {
      alert("이미 좋아요를 누르신 댓글입니다.");
    } else {
      likeComment(commentId);
      Cookies.set(`like-comment-${commentId}`, "true", { expires: 1 });
      fetchCampaignStatus(campaignId);
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
                  backgroundImage:
                    "url(" +
                    getImageUrl(donor.profileImage || DefaultUserImg) +
                    ")",
                  marginBottom: "0.4rem",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
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
            댓글 {campaignStatus.commentList.length}개
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
                                "url(" +
                                getImageUrl(
                                  comment.profileImage || DefaultUserImg
                                ) +
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
                            <div
                              className="comment-like-img"
                              style={{
                                backgroundImage: Cookies.get(
                                  `like-comment-${comment.commentId}`
                                )
                                  ? `url(${LikeActiveImg})`
                                  : `url(${Likeimg})`,
                              }}
                            />
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
