
import "../.././style/scss/style.scss";
import my1 from "../../assets/img/my1.png"

const Profile = () => {
  return (
    <div className="my-component">
      <div className="profile-wrapper">
        <div className="profile-content">
          <div className="background-box" />
          <div className="user-info">
            폭풍께님
            <br />
            ogm1***
          </div>
          <img
            className="profile-img"
            src="https://via.placeholder.com/57x58"
            alt="Profile"
          />
        </div>
      </div>
      <div className="my-home">My홈</div>
      <div className="additional-box">
        <img className="profile-img2"
          src={my1} />

        </div>
    </div>
  );
};

export default Profile;
