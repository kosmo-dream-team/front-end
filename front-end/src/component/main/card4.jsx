import facebook from "@/assets/img/facebook.svg";
import instagram from "@/assets/img/instagram.svg";
import naverblog from "@/assets/img/naverblog.svg";
import youtube from "@/assets/img/youtube.svg";
import "@/style/scss/style.scss";
const Card4 = () => {
  return (
    <div className="donation-sharing">
      {/* 제목 영역 */}
      <div className="donation-sharing__title">
        <span className="donation-sharing__title-bold">
          기부를 함께 나눠요{" "}
        </span>
        <span className="donation-sharing__title-regular">💖</span>
      </div>

      {/* 카드 컨테이너 */}
      <div className="donation-sharing__cards">
        {/* 카드 1 */}
        <div className="donation-sharing__card donation-sharing__card--pink">
          <div className="donation-sharing__card-text">
            인스타에서 드림 온의 <br />
            이벤트를 확인할 수 있어요
          </div>
          <div className="donation-sharing__card-icon">
            <img
              src={instagram}
              className="donation-sharing__card-icon-inner"
            />
          </div>
        </div>

        {/* 카드 2 */}
        <div className="donation-sharing__card donation-sharing__card--c4d3f3">
          <div className="donation-sharing__card-text">
            알림 받고 기부 포인트를 <br />
            모아봐요!
          </div>
          <div className="donation-sharing__card-icon">
            <img
              src={facebook}
              className="donation-sharing__card-icon-image donation-sharing__card-icon-image--facebook"
            />
          </div>
        </div>

        {/* 카드 3 */}
        <div className="donation-sharing__card donation-sharing__card--b6e2eb">
          <div className="donation-sharing__card-text">
            당신이 후원해준 사람들이 <br />
            어떻게 살고 있을까요?
          </div>
          <div className="donation-sharing__card-icon">
            <img src={youtube} className="donation-sharing__card-icon-inner" />
          </div>
        </div>

        {/* 카드 4 */}
        <div className="donation-sharing__card donation-sharing__card--ffd9e3">
          <div className="donation-sharing__card-text">
            온라인 봉사학교
            <br />
            드림스쿨을 소개합니다
          </div>
          <div className="donation-sharing__card-icon">
            <div className="donation-sharing__card-icon-image donation-sharing__card-icon-image--card4">
              <img
                src={naverblog}
                className="donation-sharing__card-icon-inner"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card4;
