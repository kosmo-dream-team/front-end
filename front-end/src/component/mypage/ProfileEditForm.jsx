import "../.././style/scss/style.scss";

export default function ProfileEditForm() {
  return (
    <>
      <div className="mypage-myinfo__root-container">
        <div className="mypage-myinfo__container">
          <div className="mypage-myinfo__list-wrapper">
            <p className="myinfo-title">닉네임</p>

            <input className="myinfo-value" type="text" value="추꾸신동" />
          </div>
        </div>
        <div className="border--dotted" />
        <div className="mypage-myinfo__container">
          <div className="mypage-myinfo__list-wrapper">
            <p className="myinfo-title">연락처</p>

            <input
              className="myinfo-value"
              type="number"
              value="010123123123"
            />
            <button className="myinfo-edit">변경</button>
            <button className="myinfo-delete">삭제</button>
          </div>
        </div>
        <div className="border--dotted" />
        <div className="mypage-myinfo__container">
          <div className="mypage-myinfo__list-wrapper">
            <p className="myinfo-title">이메일</p>

            <input
              className="myinfo-value"
              type="email"
              value="orm123123@gmaul.com"
            />
            <button className="myinfo-edit">변경</button>
            <button className="myinfo-delete">삭제</button>
          </div>
        </div>
        <div className="border--dotted" />
        <div className="mypage-myinfo__container">
          <div className="mypage-myinfo__list-wrapper">
            <p className="myinfo-title">나이</p>

            <input
              className="myinfo-value"
              type="date"
              value="orm123123@gmaul.com"
            />
            <button className="myinfo-edit">변경</button>
            <button className="myinfo-delete">삭제</button>
          </div>
        </div>
        <div className="border--dotted" />
        <div className="mypage-myinfo__container">
          <div className="mypage-myinfo__list-wrapper">
            <p className="myinfo-title">성별</p>

            <select name="" id="sex" className="myinfo-value">
              <option value="남성">남성</option>
              <option value="여성">여성</option>
              <option value="선택안함">선택안함</option>
            </select>

            <button className="myinfo-edit">변경</button>
            <button className="myinfo-delete">삭제</button>
          </div>
        </div>
        {/* <div className="border--dotted" />
        <div className="mypage-myinfo__container">
          <div className="mypage-myinfo__list-wrapper">
            <p className="myinfo-title">지역</p>

            <input name="" value="api사용예정" className="myinfo-value"></input>

            <button className="myinfo-edit">변경</button>
            <button className="myinfo-delete">삭제</button>
          </div>
        </div> */}
        <button className="myinfo-edit-submit">저장하기</button>
      </div>
    </>
  );
}
