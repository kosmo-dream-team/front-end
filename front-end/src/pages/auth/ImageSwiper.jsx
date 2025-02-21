import "swiper/css";
import "swiper/css/autoplay"; // swiper Autoplay css 가져오기
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// zustand 스토어에서 이미지 데이터 불러오기
import useImageStore from "@/store/useImgStore";

const ImageSwiper = () => {
  //zustand 스토어에서 images 배열을 가져옴
  const { images } = useImageStore();

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000, // 3초마다 슬라이드 전환
        disableOnInteraction: false,
      }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="signup-swiper">
          <img
            src={src}
            alt={`slide-${index}`}
            style={{
              width: "100%",
              height: "70rem",
              objectFit: "cover",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
