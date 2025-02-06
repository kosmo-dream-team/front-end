export default function NavbarMobile() {
  return (
    <nav className="navbar-mobile">
      <div className="btn"></div>
      <div onClick={() => history.back()} className="page_cover"></div>

      <div id="menu">
        <ul className="nav">
          <li>
            <a href="#">메뉴1</a>
          </li>
          <li>
            <a href="#">메뉴2</a>
          </li>
          <li>
            <a>서브 메뉴</a>
            <ul className="sub_mobile">
              <li>
                <a href="#">서브 메뉴1</a>
              </li>
              <li>
                <a href="#">서브 메뉴2</a>
              </li>
              <li>
                <a href="#">서브 메뉴3</a>
              </li>
              <li>
                <a href="#">서브 메뉴4</a>
              </li>
            </ul>
          </li>
        </ul>
        <div onClick={() => history.back()} className="close"></div>
      </div>
    </nav>
  );
}
