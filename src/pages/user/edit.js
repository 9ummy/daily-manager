import EditPwForm from 'components/user/EditPwForm';
import EditModelForm from '../../components/user/EditModelForm';
import SecessionButton from '../../components/user/SececessionButton'
import { loginCheck } from '../../utils/loginCheck';
import Header from 'components/Header';
import {useRouter} from "next/router";

function Landing() {
  loginCheck();

  const router = useRouter();

  return (
    <>
      <Header />
      <div className="container w-50">
        <h1 className="h2 border-bottom">회원 정보 수정</h1>
        <EditPwForm />
        <br />
        <EditModelForm />
        <br />
        <SecessionButton />
        <br />
        <button
          className="btn mt-1 btn-outline-primary"
          onClick={() => router.push("/schedules")}
        >
          뒤로가기
        </button>
      </div>

    </>
  );
}

export default Landing;
