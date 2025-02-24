import facebookBlack from "@/assets/img/facebook-black.svg";
import instagramBlack from "@/assets/img/instagram-black.svg";
import kakaoBlack from "@/assets/img/kakao-black.svg";
import "@/style/scss/style.scss";
const Footer = () => {
  return (
    <div className="donation-footer">
      {/* 빈 스페이서 (디자인용) */}
      <div className="donation-footer__spacer" />

      {/* 네비게이션 영역 */}
      <div className="donation-footer__nav">
        {/* © Dream On Corp. */}
        <div className="donation-footer__nav-group donation-footer__nav-group--corp">
          <div className="donation-footer__nav-text">© Dream On Corp.</div>
          <div className="donation-footer__nav-dot" />
        </div>
        {/* 고객센터 */}
        <div className="donation-footer__nav-group donation-footer__nav-group--support">
          <div className="donation-footer__nav-text">고객센터</div>
          <div className="donation-footer__nav-dot" />
        </div>
        {/* 문의하기 */}
        <div className="donation-footer__nav-group donation-footer__nav-group--inquire">
          <div className="donation-footer__nav-text">문의하기</div>
          <div className="donation-footer__nav-dot" />
        </div>
        {/* 이용약관 */}
        <div className="donation-footer__nav-group donation-footer__nav-group--terms">
          <div className="donation-footer__nav-text">이용약관</div>
          <div className="donation-footer__nav-dot" />
        </div>
        {/* 개인정보처리방침 (글자만) */}
        <div className="donation-footer__nav-privacy">개인정보처리방침</div>
      </div>

      {/* 소셜 아이콘 영역 */}
      <div className="donation-footer__social">
        {/* 첫번째 아이콘 */}
        <div className="donation-footer__social-icon">
          <div className="donation-footer__social-icon-inner">
            <div className="donation-footer__social-icon-bg-wrapper">
              <div className="donation-footer__social-icon-bg" />
              <img
                src={kakaoBlack}
                className="donation-footer__social-icon-overlay"
              />
            </div>
            <div className="donation-footer__social-icon-line" />
          </div>
        </div>
        {/* 두번째 아이콘 */}
        <div className="donation-footer__social-icon">
          <div className="donation-footer__social-icon-inner">
            <div className="donation-footer__social-icon-bg-wrapper">
              <div className="donation-footer__social-icon-bg" />
              <img
                src={instagramBlack}
                className="donation-footer__social-icon-overlay"
              />
            </div>
            <div className="donation-footer__social-icon-line" />
          </div>
        </div>
        {/* 세번째 아이콘 */}
        <div className="donation-footer__social-icon">
          <div className="donation-footer__social-icon-inner">
            <div className="donation-footer__social-icon-bg-wrapper">
              <div className="donation-footer__social-icon-bg" />
              <img
                src={facebookBlack}
                className="donation-footer__social-icon-overlay"
              />
            </div>
            <div className="donation-footer__social-icon-line" />
          </div>
        </div>
      </div>

      {/* 타이틀 영역 */}
      <div className="donation-footer__title">드림온 기부 프로젝트</div>
    </div>
  );
};

export default Footer;
