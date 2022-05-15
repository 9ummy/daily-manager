import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import JoinForm from 'components/user/JoinForm';

function Landing() {
  return (
    <div className="container w-25">
      <div className="row text-center m-5">
        <Image
          src="/logo.png"
          alt="daily manager logo"
          width="372"
          height="154"
        />
      </div>
      <JoinForm />
    </div>
  );
}

export default Landing;
