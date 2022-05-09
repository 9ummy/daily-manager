import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import JoinForm from 'components/user/JoinForm';
import { loginCheck } from 'utils/loginCheck';

function Landing() {

  loginCheck()

  return (
    <div>
      <JoinForm />
    </div>
  );
}

export default Landing;
