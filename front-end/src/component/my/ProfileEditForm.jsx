import { useState } from 'react';
import "../.././style/scss/style.scss";

//주스텐드로 상태관리가 필요해보임.
const ProfileEditForm = () => {
  // 변경 가능한 필드에 대한 상태 관리 
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  // 이름은 수정 불가
  const name = '홍길동';

  const handleSubmit = (e) => {
    e.preventDefault();

    // 이름을 제외한 필드 빈값 검증
     if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    } else if (password === "") {
      alert("패스워드를 입력해주세요");

      return;
    } else if (phone === "") {
      alert("전화번호를 입력해주세요.");
      return;
    } else if (gender === "") {
      alert("성별을 선택해주세요.");
      return;
    }

    // 비밀번호와 비밀번호 재입력이 동일한지 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 검증 통과 시 제출 처리 (예: API 호출)
    console.log('제출된 값:', { email, phone, password, confirmPassword, gender });
  };

  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">이름</label>
        <input type="text" id="name" value={name} readOnly />
      </div>
      <div className="form-group">
        <label>성별</label>
        <div>
          <label htmlFor="gender-male">
            <input
              type="radio"
              id="gender-male"
              name="gender"
              value="남자"
              checked={gender === '남자'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            남자
          </label>
          <label htmlFor="gender-female">
            <input
              type="radio"
              id="gender-female"
              name="gender"
              value="여자"
              checked={gender === '여자'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            여자
          </label>
        </div>
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
      <div className="form-group">
        <label htmlFor="confirmPassword">비밀번호 재입력</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="save-button">저장하기</button>
    </form>
  );
};

export default ProfileEditForm;
