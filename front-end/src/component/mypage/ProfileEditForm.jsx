import axios from "axios";
import MockAdapter from "axios-mock-adapter"; // 모킹 어댑터 import
import { useEffect, useState } from "react";
import "../.././style/scss/style.scss";

// axios 모킹 설정 (개발 중 더미 데이터 확인용)
// 0.5초 후에 응답하도록 delay 설정
// const mock = new MockAdapter(axios, { delayResponse: 500 });
// mock.onGet("http://localhost:8586/api/profile").reply(200, {
//   nickname: "추꾸신동",
//   contact: "010123123123",
//   email: "orm123123@gmaul.com",
//   age: "1980-01-01", // input type="date"에 맞는 형식
//   gender: "남성",
// });

export default function ProfileEditForm() {
  // API로부터 받아온 프로필 데이터를 저장할 상태
  const [profile, setProfile] = useState({
    nickname: "",
    contact: "",
    email: "",
    age: "",
    gender: "",
  });

  // 컴포넌트가 마운트되면 API 호출해서 더미 데이터를 받아옴
  useEffect(() => {
    axios
      .get("http://localhost:8586/api/profile")
      .then((response) => {
        setProfile(response.data);
        console.log("API 호출 성공, 받아온 데이터:", response.data);
      })
      .catch((error) => {
        console.error("API 호출 실패:", error);
      });
  }, []);

  return (
    <div className="mypage-myinfo__root-container">
      <div className="mypage-myinfo__container">
        <div className="mypage-myinfo__list-wrapper">
          <p className="myinfo-title">닉네임</p>
          <input
            className="myinfo-value"
            type="text"
            value={profile.nickname}
            readOnly
          />
        </div>
      </div>
      <div className="border--dotted" />
      <div className="mypage-myinfo__container">
        <div className="mypage-myinfo__list-wrapper">
          <p className="myinfo-title">연락처</p>
          <input
            className="myinfo-value"
            type="number"
            value={profile.contact}
            readOnly
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
            value={profile.email}
            readOnly
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
            value={profile.age}
            readOnly
          />
          <button className="myinfo-edit">변경</button>
          <button className="myinfo-delete">삭제</button>
        </div>
      </div>
      <div className="border--dotted" />
      <div className="mypage-myinfo__container">
        <div className="mypage-myinfo__list-wrapper">
          <p className="myinfo-title">성별</p>
          <select
            name="gender"
            id="sex"
            className="myinfo-value"
            value={profile.gender}
            disabled
          >
            <option value="남성">남성</option>
            <option value="여성">여성</option>
            <option value="선택안함">선택안함</option>
          </select>
          <button className="myinfo-edit">변경</button>
          <button className="myinfo-delete">삭제</button>
        </div>
      </div>
      <button className="myinfo-edit-submit">저장하기</button>
    </div>
  );
}
