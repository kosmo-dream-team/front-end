import { useState } from "react";
import { Link } from "react-router-dom";

import useNavbarStore from "../../../store/useNavbarStore";
import IsLogin from "./IsLogin";
export default function NavbarDesktop() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { menuDb } = useNavbarStore(); // zustand 스토어에서 menuDb 가져오기

  return (
    <div className="layout__header">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to={menuDb.mainPage}>{menuDb.logoTheme}</Link>
        </div>

        <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <ul>
            {menuDb.menuList.map((menu, index) => (
              <li key={index}>
                <Link to={menu.url} className="nav-list">
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          {menuDb.util.map((data, index) => (
            <Link to key={index} href={data.url}>
              {data.logo}
            </Link>
          ))}
          <IsLogin />
        </div>

        <div className="navbar-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>
    </div>
  );
}
