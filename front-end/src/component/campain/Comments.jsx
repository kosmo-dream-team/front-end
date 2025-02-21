import "@/style/scss/style.scss";
import { useState } from "react";

const Comments = () => {
  // 초기 댓글 목록 (하드코딩)
  const [comments, setComments] = useState([
    { id: "추꾸신동", text: "정말 감동적이에요!" },
    { id: "야구신동", text: "도움이 필요합니다. 함께 해요." },
  ]);

  // 새 댓글 입력값 상태
  const [newComment, setNewComment] = useState("");

  // 댓글 추가 핸들러
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const newCommentObj = {
      id: comments.length + 1,
      text: newComment.trim(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <section className="comments-section">
      <h3 className="comments-section__title">댓글</h3>
      <ul className="comments-section__list">
        {comments.map((comment) => (
          <li key={comment.id} className="comments-section__item">
            <div className="comments-section__item-id">ID: {comment.id}</div>
            <div className="comments-section__item-text">{comment.text}</div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="comments-section__form">
        <textarea
          className="comments-section__textarea"
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button type="submit" className="comments-section__submit">
          댓글 달기
        </button>
      </form>
    </section>
  );
};

export default Comments;
