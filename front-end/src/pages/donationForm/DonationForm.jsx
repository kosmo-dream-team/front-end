import Footer from "@/component/common/footer/Footer";
import Navbar from "@/component/common/navbar/Navbar";
import "@/style/scss/style.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../../store/useUserProfile";

const DonationForm = () => {
  // zustand 스토어에서 사용자 프로필 정보를 가져옴
  const { profile } = useUserProfile();
  const navigate = useNavigate();

  // 사용자가 "applicant" 타입이 아니면 접근 불가 처리
  useEffect(() => {
    if (profile && profile.user_type !== "applicant") {
      alert("수혜자 전용 페이지입니다.");
      navigate("/"); // 메인 페이지 등 원하는 페이지로 리다이렉트
    }
  }, [profile, navigate]);

  // 카테고리 목록 상태 추가
  const [categories, setCategories] = useState([]);

  // 폼 데이터를 상태로 관리 (카테고리 드롭다운을 위한 categoryId 추가)
  const [formData, setFormData] = useState({
    categoryId: "", // 사용자가 선택한 카테고리 ID
    title: "",
    description: "",
    targetAmount: "",
    deadline: "", // "yyyy-MM-dd" 형식 (예: "2025-03-22")
    attachment: null,
  });

  // 백엔드에서 카테고리 목록 불러오기
  useEffect(() => {
    axios
      .get("http://localhost:8586/api/category")
      .then((response) => {
        const data = response.data.categories || response.data;
        setCategories(data);
        if (Array.isArray(data) && data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            categoryId: data[0].categoryId,
          }));
        }
      })
      .catch((error) => {
        console.error("카테고리 목록 불러오기 실패:", error);
      });
  }, []);

  // 입력값 변경 핸들러 (카테고리 선택 포함)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 파일 변경 핸들러
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("categoryId", formData.categoryId);
    submissionData.append("title", formData.title);
    submissionData.append("userId", profile.user_id || 0);
    submissionData.append("targetAmount", formData.targetAmount);

    // 시작일: ISO 문자열에서 밀리초와 'Z' 제거
    const now = new Date();
    const startDateStr = now.toISOString().slice(0, 19);
    submissionData.append("startDate", startDateStr);

    // deadline 값을 "T00:00:00" 덧붙여 ISO 형식으로 전송
    submissionData.append("endDate", formData.deadline + "T00:00:00");

    submissionData.append("status", "pending");
    submissionData.append("description", formData.description);

    if (formData.attachment) {
      submissionData.append("projectImageFile", formData.attachment);
    }
    submissionData.append("shareCount", 0);
    submissionData.append("likeCount", 0);

    try {
      const token = localStorage.getItem("authToken");
      console.log("authToken:", token);

      const response = await axios.post(
        "http://localhost:8586/project/create",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("프로젝트 생성 성공:", response.data);

      // 성공 후 알림창 표시
      alert("신청이 완료되었습니다.");

      // 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("프로젝트 생성 실패:", error);
      if (error.response) {
        console.error("응답 데이터:", error.response.data);
        console.error("응답 상태 코드:", error.response.status);
        console.error("응답 헤더:", error.response.headers);
      }
    }
  };

  return (
    <>
      <Navbar />
      <form className="donation-form" onSubmit={handleSubmit}>
        <h2>기부 신청</h2>

        <div className="form-group">
          <label htmlFor="categoryId">분류</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

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
          <label htmlFor="description">내용</label>
          <textarea
            id="description"
            name="description"
            placeholder="기부 신청 내용을 자세히 입력하세요"
            value={formData.description}
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
          <label htmlFor="attachment">첨부 파일</label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            onChange={handleFileChange}
          />
        </div>

        {/* 수혜자 및 연락처 정보: 로그인한 사용자 정보를 그대로 사용 */}
        <div className="form-group">
          <label htmlFor="beneficiaryName">수혜자</label>
          <input
            type="text"
            id="beneficiaryName"
            name="beneficiaryName"
            value={profile.user_name || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">연락처</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={profile.phone || ""}
            readOnly
          />
        </div>

        <button type="submit">신청하기</button>
      </form>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Footer />
      </div>
    </>
  );
};

export default DonationForm;
