import "@/style/scss/style.scss";
import { Link } from "react-router-dom";

function Favicon() {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div className="favicon">
        {/* 상단 로고 */}
        <div className="favicon-text" style={{ textDecoration: "none" }}>
          DREAM ON
        </div>
        <div className="favicon-line">
          <div className="favicon-line-gradient" />
        </div>
      </div>
    </Link>
  );
}
export default Favicon;
