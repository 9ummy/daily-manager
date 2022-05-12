import LoginForm from 'components/user/LoginForm';

export default function Home() {
  return (
    <div className="container w-25">
      <div className="row text-center m-5">
        <img src="/logo.png" />
      </div>
      <LoginForm />
    </div>
  );
}
