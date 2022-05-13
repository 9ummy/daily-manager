import EditPwForm from 'components/user/EditPwForm';
import EditModelForm from '../../components/user/EditModelForm';
import { loginCheck } from '../../utils/loginCheck';
import Header from 'components/Header';

function Landing() {
  loginCheck();

  return (
    <>
      <Header />
      <div className="container w-50">
        <h1 className="h2 border-bottom">회원 정보 수정</h1>
        <EditPwForm />
        <br />
        <EditModelForm />
      </div>
    </>
  );
}

export default Landing;
