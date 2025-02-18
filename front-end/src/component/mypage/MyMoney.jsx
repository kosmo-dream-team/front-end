import useUserProfile from "../../store/useUserProfile";
import "../../style/scss/style.scss";

export default function MyMoney() {
  const { profile, isLoading, error } = useUserProfile();

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터를 불러오는 중 오류 발생: {error.message}</p>;

  return (
    <div className="mymoney-container">
      <span className="mymoney-label">총 후원금액</span>
      <span className="mymoney-value">{profile.total_donation_count}원</span>
    </div>
  );
}
