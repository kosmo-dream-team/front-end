import "@/style/scss/style.scss";

const Article = () => {
  // 하드코딩된 데이터
  const title = "사랑의 열매 캠페인";
  const description = `이 캠페인은 사고피해 유가족들을 지원하기 위해 진행됩니다. 
  피해자들의 어려움을 덜어주고 희망을 전달하기 위한 다양한 프로그램이 운영되고 있습니다. 
  여러분의 작은 도움이 큰 변화를 만들 수 있습니다.`;
  const images = [
    "https://via.placeholder.com/300x200?text=Image+1",
    "https://via.placeholder.com/300x200?text=Image+2",
    "https://via.placeholder.com/300x200?text=Image+3",
  ];

  return (
    <section className="campaign-story">
      {/* 캠페인 제목 */}
      <h2 className="campaign-story__title">{title}</h2>

      {/* 캠페인 상세 설명 */}
      <p className="campaign-story__description">{description}</p>

      {/* 이미지 섹션 */}
      <div className="campaign-story__images">
        {images.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`캠페인 이미지 ${index + 1}`}
            className="campaign-story__image"
          />
        ))}
      </div>
    </section>
  );
};

export default Article;
