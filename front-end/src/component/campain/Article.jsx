
import "../.././style/scss/style.scss";

const Article = () => {
  return (
    <div className="article">
      <div className="article-inner">
        {/* 배경 이미지 */}
        <img
          className="article-bg"
          src="https://via.placeholder.com/708x836"
          alt="Background"
        />

        {/* 본문 영역 */}
        <div className="article-content">
          <img
            className="article-content-img"
            src="https://via.placeholder.com/708x399"
            alt="Content"
          />
          <div className="article-desc">
            가족들과 새로운 희망으로 새해를 준비하는 겨울,우크라이나 사람들은 이 계절을 잘 버티고 살아남기만 간절히
            <br />
            바라고있습니다
          </div>
          <div className="article-text">
            우크라이나 전쟁이 시작된지 1,000일이 지나도록 아직전쟁은 끝나지 않았습니다. 영하로 떨어지는 날씨에 갑
            <br />
            작스러운 공습으로 에너지 시설이 파괴되고, 정전이 되는 경우도 있습니다. 평범한 하루를 보내던 수백만의 사람
            <br />
            들이하루아침에 집을 잃고 폴란드, 헝가리, 몰도바등 인근 국가로 탈출하여 난민으로 살아가고 있습니다.
          </div>
          <div className="article-quote">
            '쏟아지는 폭격을 피해, 온 가족이 수개월을 어둡고 추운 지하실에서 버어요."
            <br />
            "공습 사이렌을 겪은 아이들과 선생님들이 놀랄까봐 난민 학교에서는 수업종소리를 울리지 않아요.'
          </div>
          <div className="article-title">
            우크라이나 사람들은 올겨울도 집으로 돌아갈 수 없습니다.
          </div>
          <div className="article-divider" />
          <img
            className="article-small-img"
            src="https://via.placeholder.com/84x2"
            alt="Small Divider"
          />
        </div>

        {/* 상단 메뉴바 */}
        <div className="article-menu">
          <div className="menu-item menu-news">
            <div className="menu-text">소식</div>
          </div>
          <div className="menu-item menu-donation">
            <div className="menu-text">기부현황</div>
          </div>
          <div className="menu-item menu-intro">
            <div className="menu-text">모금소개</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
