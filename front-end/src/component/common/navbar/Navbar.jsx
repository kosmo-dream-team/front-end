import NavbarDesktop from "./NavbarDesktop";

// 미디어쿼리에따라 모바일 메뉴바 나오는것 삭제
export default function Navbar() {
  // const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  //모바일 사이즈일 경우 NavbarMobile 컴포넌트를 렌더링하고,
  //  그렇지 않을 경우 NavbarDesktop 컴포넌트를 렌더링
  return <NavbarDesktop />;
}
