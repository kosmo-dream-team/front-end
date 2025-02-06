import { useMediaQuery } from "use-media-query";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width: 479px)");

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
}
