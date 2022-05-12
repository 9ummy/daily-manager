import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import JoinForm from 'components/user/JoinForm';

function Landing() {

  return (
    <div className="container w-25">
      <div className="row text-center m-5">
        <img src="/logo.png" />
      </div>
      <JoinForm />
    </div>
  );
}

export default Landing;
