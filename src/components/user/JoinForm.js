import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signInUser } from 'store/actions/user';
import { useRouter } from 'next/router';

function JoinForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmitHandler = (data) => {
    if (data) {
      if (data.pw !== data.cpw) {
        alert('입력된 암호와 확인 암호가 다릅니다!');
        return;
      }
      var joinUser = {
        id: data.id,
        email: data.email,
        pw: data.pw,
      };
      dispatch(signInUser(joinUser));
    }
  };
  const loginButtonHandler = () => {
    router.push('./login');
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
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

      <div className="form-group row mb-2">
        <input
          type="password"
          id="pwConfirmInput"
          name="cpw"
          placeholder="비밀번호 확인"
          className="form-control"
          ref={register({ required: true })}
        />
      </div>

      <div className="text-center">
        <button className="btn btn-primary m-1" type="submit">
          등록
        </button>
        <Link href="/user/login/" className="btn btn-link m-1">로그인 화면으로</Link>
      </div>
    </form>
  );
}

export default JoinForm;
