import { useDispatch, useSelector } from 'react-redux';
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
      //TODO : 일정 리스트 생성 router.push("/sacContent")
    }
  };

  const joinButtonHandler = () => {
      router.push("./join");
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
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
        <a href="./join" className="btn btn-link m-1">
          가입
        </a>
      </div>
    </form>
  );
}

export default LoginForm;
