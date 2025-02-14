import Footer from "../../component/common/footer/Footer";
import Navbar from "../../component/common/navbar/Navbar";
import MyMoney from "../../component/mypage/MyMoney";
import MyPageMenu from "../../component/mypage/MyPageMenu";
import ProfileEditForm from "../../component/mypage/ProfileEditForm";
import "../../style/scss/style.scss";
function MyPage() {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <div className="layout__mypage-container">
        <div className="layout__mypage-left-panel">
          <div className="layout__mypage-menu">
            <MyPageMenu />
          </div>
        </div>

        <div className="layout__mypage-right-panel">
          <div className="layout__mypage-mymoney">
            {" "}
            <MyMoney />
          </div>

          <div className="layout__mypage-myinfo">
            <ProfileEditForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default MyPage;
