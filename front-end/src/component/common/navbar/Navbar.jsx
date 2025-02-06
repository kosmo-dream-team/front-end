import { useMediaQuery } from "react-responsive";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  // 방법 1: query 속성을 이용한 객체 전달
  const isMobile = useMediaQuery({ query: "(max-width: 479px)" });

  // 방법 2: maxWidth 속성을 직접 전달하는 방법도 가능합니다.
  // const isMobile = useMediaQuery({ maxWidth: 479 });

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
}
