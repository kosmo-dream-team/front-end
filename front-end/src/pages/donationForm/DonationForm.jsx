import { useState } from "react";
import "../../style/scss/style.scss";

const DonationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    targetAmount: "",
    deadline: "",
    beneficiaryName: "",
    beneficiaryContact: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 API 호출 등으로 formData를 전송하면 됩니다.
    console.log("폼 데이터:", formData);
  };

  return (
    <form className="donation-form" onSubmit={handleSubmit}>
      <h2>기부 신청</h2>
      <div className="form-group">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="제목을 입력하세요"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          name="content"
          placeholder="기부 신청 내용을 자세히 입력하세요"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="targetAmount">목표 금액</label>
        <input
          type="number"
          id="targetAmount"
          name="targetAmount"
          placeholder="목표 금액을 입력하세요"
          value={formData.targetAmount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="deadline">모집 기간</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="beneficiaryName">수혜자 이름</label>
        <input
          type="text"
          id="beneficiaryName"
          name="beneficiaryName"
          placeholder="수혜자 이름을 입력하세요"
          value={formData.beneficiaryName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="beneficiaryContact">연락처</label>
        <input
          type="text"
          id="beneficiaryContact"
          name="beneficiaryContact"
          placeholder="연락처를 입력하세요"
          value={formData.beneficiaryContact}
          onChange={handleChange}
          required
        />
      </div>

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
