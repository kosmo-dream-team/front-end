import applicant from "../../assets/img/applicant.png";
import donor from "../../assets/img/donor.png";
import "../../style/scss/style.scss";
import { Link } from 'react-router-dom';


function RegistType() {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <h1 className="regist-type-title">회원가입 유형을 선택해주세요.</h1>
      <div className="regist-type-container">
        <button className="regist-type">
          <Link to="/registType/signup">기부자</Link>
          <img src={donor} alt="" />
        </button>
        <button className="regist-type">
          <Link to="/registType/signup">수혜자</Link>
          <img src={applicant} alt="" />
        </button>
      </div>
    </div>
  );
}

export default RegistType;
