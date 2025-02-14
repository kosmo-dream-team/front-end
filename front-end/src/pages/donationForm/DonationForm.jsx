// src/pages/DonationForm.jsx

import { useNavigate } from "react-router-dom";
import { dataProvider } from "../../data/dataProvider"; // 공유된 데이터 프로바이더
import { useDonationStore } from "../../store/useDonation"; // Zustand 스토어 임포트
import "../../style/scss/style.scss";

const DonationForm = () => {
  const navigate = useNavigate();

  // Zustand 스토어에서 donationData와 업데이트 함수를 가져옵니다.
  const { donationData, setDonationData, resetDonationData } = useDonationStore();

  // input onChange 핸들러: Zustand 스토어의 데이터를 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData({ [name]: value });
  };

  const handleFileChange = (e) => {
    setDonationData({ attachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // dataProvider.create를 사용하여 'applications' 리소스에 새 데이터를 추가합니다.
      const { data } = await dataProvider.create("applications", { data: donationData });
      console.log("신청 성공:", data);
      resetDonationData(); // 제출 후 폼 초기화
      navigate("/admin/applications");
    } catch (error) {
      console.error("신청 실패:", error);
    }
  };

  return (
    <form className="donation-form" onSubmit={handleSubmit}>
      <h2>기부 신청</h2>

      {/* 카테고리 선택 */}
      <div className="form-group">
        <label htmlFor="category">분류</label>
        <select
          id="category"
          name="category"
          value={donationData.category}
          onChange={handleChange}
          required
        >
          <option value="">---------</option>
          <option value="아동">아동</option>
          <option value="동물">동물</option>
          <option value="환경">환경</option>
          <option value="장애인">장애인</option>
          <option value="지구촌">지구촌</option>
          <option value="어르신">어르신</option>
          <option value="사회">사회</option>
        </select>
      </div>

      {/* 제목 입력 */}
      <div className="form-group">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="제목을 입력하세요"
          value={donationData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* 내용 입력 */}
      <div className="form-group">
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          name="content"
          placeholder="기부 신청 내용을 자세히 입력하세요"
          value={donationData.content}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* 목표 금액 */}
      <div className="form-group">
        <label htmlFor="targetAmount">목표 금액</label>
        <input
          type="number"
          id="targetAmount"
          name="targetAmount"
          placeholder="목표 금액을 입력하세요"
          value={donationData.targetAmount}
          onChange={handleChange}
          required
        />
      </div>

      {/* 모집 기간 */}
      <div className="form-group">
        <label htmlFor="deadline">모집 기간</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={donationData.deadline}
          onChange={handleChange}
          required
        />
      </div>

      {/* 수혜자 이름 */}
      <div className="form-group">
        <label htmlFor="beneficiaryName">수혜자 이름</label>
        <input
          type="text"
          id="beneficiaryName"
          name="beneficiaryName"
          placeholder="수혜자 이름을 입력하세요"
          value={donationData.beneficiaryName}
          onChange={handleChange}
          required
        />
      </div>

      {/* 연락처 */}
      <div className="form-group">
        <label htmlFor="beneficiaryContact">연락처</label>
        <input
          type="text"
          id="beneficiaryContact"
          name="beneficiaryContact"
          placeholder="연락처를 입력하세요"
          value={donationData.beneficiaryContact}
          onChange={handleChange}
          required
        />
      </div>

      {/* 첨부 파일 */}
      <div className="form-group">
        <label htmlFor="attachment">첨부 파일</label>
        <input
          type="file"
          id="attachment"
          name="attachment"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit">신청하기</button>
    </form>
  );
};

export default DonationForm;
