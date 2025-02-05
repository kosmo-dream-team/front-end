import React, { useState } from 'react';
import "../.././style/scss/style.scss";

const ProfileEditForm = () => {
  // 변경 가능한 필드에 대한 상태 관리 (초기값은 예시입니다)
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('01012345678');
  const [password, setPassword] = useState('');

  // 이름과 성별은 변경할 수 없는 값 (예시)
  const name = '홍길동';
  const gender = '남자';

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 시 처리할 로직 (API 호출 등)
    console.log('제출된 값:', { email, phone, password });
  };

  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">이름</label>
        <input type="text" id="name" value={name} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="gender">성별</label>
        <input type="text" id="gender" value={gender} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">전화번호</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="save-button">저장하기</button>
    </form>
  );
};

export default ProfileEditForm;
