import "../../style/scss/style.scss";

export default function MyMoney() {
  return (
    <>
      <div
        style={{
          width: "700px",
          height: "96px",
          position: "relative",
          background: "white",
        }}
      >
        <div
          style={{
            width: "96px",
            height: "38px",
            left: "578px",
            top: "33px",
            position: "absolute",
            color: "#FF9191",
            fontSize: "24.80px",
            fontFamily: "Inter",
            fontWeight: "600",
            wordWrap: "break-word",
          }}
        >
          1,000원
        </div>
        <div
          style={{
            width: "74px",
            height: "21px",
            left: "374px",
            top: "40px",
            position: "absolute",
            color: "#535054",
            fontSize: "14.30px",
            fontFamily: "Noto Sans",
            fontWeight: "600",
            wordWrap: "break-word",
          }}
        >
          총후원금액
        </div>
        <img
          style={{
            width: "2px",
            height: "62px",
            left: "348px",
            top: "17px",
            position: "absolute",
          }}
          src="https://placehold.co/2x62"
        />
        <div
          style={{
            width: "37px",
            height: "28px",
            left: "286px",
            top: "37px",
            position: "absolute",
            color: "#FF9191",
            fontSize: "22.20px",
            fontFamily: "Inter",
            fontWeight: "600",
            wordWrap: "break-word",
          }}
        >
          0원
        </div>
        <div
          style={{
            width: "87px",
            height: "21px",
            left: "26px",
            top: "40px",
            position: "absolute",
            color: "#605C62",
            fontSize: "14.30px",
            fontFamily: "Noto Sans",
            fontWeight: "600",
            wordWrap: "break-word",
          }}
        >
          나의 보유금액
        </div>
      </div>
    </>
  );
}
