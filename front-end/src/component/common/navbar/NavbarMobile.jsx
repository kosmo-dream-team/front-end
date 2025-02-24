import useNavbarStore from "@/store/useNavbarStore";
import { Link } from "react-router-dom";

export default function NavbarMobile() {
  const { menuDb } = useNavbarStore();

  return (
    <nav className="navbar-mobile">
      <div className="mobile_btn">
        <input type="checkbox" id="hamburger" />
        <label htmlFor="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className="sidebar">
          {/* 로고 영역: menuDb.logoTheme과 mainPage 사용 */}
          <h2
            style={{ textAlign: "center", position: "relative", top: "75px" }}
          >
            이미지 <img src="" alt="" />
          </h2>
          <h2
            style={{ textAlign: "center", position: "relative", top: "75px" }}
          >
            골드클래스 김진우님 환영합니다.
          </h2>
          <hr
            style={{
              position: "relative",
              top: "100px",
              border: "solid 1px black",
            }}
          />
          {/* 메뉴 목록 영역 */}
          <ul className="nav_mobile">
            {menuDb.menuList.map((menu, index) => (
              <li key={index}>
                <Link to={menu.url} className="nav-list">
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* util 링크 영역 (필요시 사용) */}
          {/* <div className="nav_util">
            {menuDb.util.map((item, index) => (
              <Link to={item.url} key={index}>
                {item.logo}
              </Link>
            ))}
          </div> */}
          {/* 로그인 상태에 따른 메뉴가 필요하다면 추가 */}
          {/* 예시: <UserInfo /> */}
        </div>
      </div>
    </nav>
  );
}
