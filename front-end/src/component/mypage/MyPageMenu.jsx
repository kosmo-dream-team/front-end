import "../.././style/scss/style.scss";
import profile from "../../assets/img/profile1.png";
export default function MyPageMenu() {
  return (
    <>
      <div className="mypage-menu-container">
        <div className="profile-card">
          <div className="profile-card__background"></div>
          <div className="profile-card__text">
            폭풍께님
            <br />
            ogm1***
          </div>
          <img className="profile-card__img" src={profile} alt="Profile" />
        </div>
        <div>
          <a href="" className="mypage-menu-sub-menu">
            My 홈
          </a>
        </div>
      </div>
    </>
  );
}
