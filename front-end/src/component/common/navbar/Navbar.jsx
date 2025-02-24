import { useMediaQuery } from "react-responsive";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
 
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
   //모바일 사이즈일 경우 NavbarMobile 컴포넌트를 렌더링하고,
   //  그렇지 않을 경우 NavbarDesktop 컴포넌트를 렌더링
  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
}
