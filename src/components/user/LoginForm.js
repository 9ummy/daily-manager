import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { loginUser } from 'store/actions/user';
import { useRouter } from 'next/router';

function LoginForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmitHandler = (data) => {
    if (data) {
      dispatch(loginUser(data));
    }
  };

  const lostRequired = () => {
    alert("필수 입력 값이 누락되었습니다.")
  }

  const joinButtonHandler = () => {
    router.push('/user/join');
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmitHandler, lostRequired)} noValidate>
      <div className="mb-2">
        <div className="form-group row mb-2">
          <input
            type="text"
            id="idInput"
            name="id"
            placeholder="ID"
            className="form-control"
            ref={register({ required: true })}
          />
        </div>
        <div className="form-group row mb-2">
          <input
            type="password"
            id="pwInput"
            name="pw"
            placeholder="비밀번호"
            className="form-control"
            ref={register({ required: true })}
          />
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary m-1" type="submit">
          로그인
        </button>
        <Link href="/user/join" className="btn btn-link m-1">
          가입
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
