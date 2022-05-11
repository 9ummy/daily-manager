import EditPwForm from 'components/user/EditPwForm'
import EditModelForm from "../../components/user/EditModelForm";
import { loginCheck } from '../../utils/loginCheck'

function Landing(){

  loginCheck();

  return (
    <div>
      <EditPwForm />
      <br />
      <EditModelForm />
    </div>
  );
}

export default Landing;