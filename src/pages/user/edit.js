import EditPwForm from 'components/user/EditPwForm'
import { loginCheck } from '../../utils/loginCheck'

function Landing(){

  loginCheck();

  return (
    <div>
      <EditPwForm />
    </div>
  );
}

export default Landing;