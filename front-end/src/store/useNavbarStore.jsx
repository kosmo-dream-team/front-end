import { create } from "zustand";

import CartIco from "../assets/img/cart.png";
import SearchIco from "../assets/img/search.svg";
import Favicon from "../component/logo/Favicon";
//navbar에 사용되는 데이터들. desktop,mobile 공통
const useMenuStore = create(() => ({
  menuDb: {
    pageName: "드림온", //페이지이름 x
    mainPage: "/pages/main/mainPage", // react-router-dom에서는 절대 경로 사용을 권장합니다.
    logoTheme: <Favicon />, //favicon
    menuList: [
      //메뉴
      { name: "홈", url: "/" },
      // { name: "회사 소개", url: "/pages/company" },
      { name: "카테고리", url: "/pages/category" },
      { name: "기부 통계", url: "/pages/stats" },

      { name: "마이페이지", url: "/pages/mypage" },
    ],
    util: [
      {
        name: "search",
        url: "/search",
        logo: <img src={SearchIco} alt="Search" />,
      },
      {
        name: "facebook",
        url: "https://www.facebook.com",
        logo: <img src={CartIco} alt="Cart" />,
      },
    ],
  },
}));

export default useMenuStore;
