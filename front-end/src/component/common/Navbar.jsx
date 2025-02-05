import { useState } from "react";
import Favicon from "../logo/Favicon";
const menuDb = {
  pageName: "GoodMemory",
  mainPage: "index.html",
  logoTheme: <Favicon />,
  menuList: [
    { name: "Home", url: "./index.html" },
    { name: "Gallary", url: "./Gallary.html" },
    { name: "Study", url: "./study.html" },
    { name: "FAQ", url: "./FAQ.html" },
    { name: "Bookings", url: "./Bookings.html" },
  ],
  socialList: [
    {
      name: "twitter",
      url: "https://www.twitter.com",
      logo: <i className="fab fa-twitter"></i>,
    },
    {
      name: "facebook",
      url: "https://www.facebook.com",
      logo: <i className="fab fa-facebook-f"></i>,
    },
  ],
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href={menuDb.mainPage}>
          {menuDb.logoTheme}
          <h1>{menuDb.pageName}</h1>
        </a>
      </div>

      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          {menuDb.menuList.map((menu, index) => (
            <li key={index}>
              <a href={menu.url} className="nav-list">
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {menuDb.socialList.map((social, index) => (
          <a key={index} href={social.url}>
            {social.logo}
          </a>
        ))}
      </div>

      <div className="navbar-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fas fa-bars"></i>
      </div>
    </nav>
  );
}
