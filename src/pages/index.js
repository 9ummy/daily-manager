import Image from 'next/image';
import LoginForm from 'components/user/LoginForm';

export default function Home() {
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
      <LoginForm />
    </div>
  );
}
