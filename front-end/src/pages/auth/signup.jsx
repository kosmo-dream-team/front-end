
import { useParams } from "react-router-dom";
import DonorSignUpForm from "./DonorSignUpForm";
import ApplicantSignUpForm from "./ApplicantSignUpForm";

function SignUp() {
  // URL에서 userType 파라미터를 읽어옵니다.
  const { userType } = useParams();

  // userType 값에 따라 해당하는 회원가입 폼을 렌더링합니다.
  if (userType === "donor") {
    return <DonorSignUpForm />;
  } else if (userType === "applicant") {
    return <ApplicantSignUpForm />;
  } else {
    return <div>유효하지 않은 접근입니다.</div>;
  }

}

export default SignUp;
