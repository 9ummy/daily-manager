import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signInUser } from 'store/actions/user';
import { useRouter } from 'next/router';

function JoinForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const checkPwValidation = (pw) => {
    return pw.length >= 8 && /^(?=[a-z0-9]*$)(?:\d+[a-z]|[a-z]+\d)[a-z\d]*$/i.test(pw);
  }

  const onSubmitHandler = (data) => {
    if (data) {
      if (data.pw !== data.cpw) {
        alert('입력된 암호와 확인 암호가 다릅니다!');
        return;
      } else if (checkPwValidation(data.pw) === false){
        alert('올바르지 못한 비밀번호 입니다.');
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

  const lostRequired = () => {
    alert("필수 입력 값이 누락되었습니다.")
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmitHandler, lostRequired)} noValidate>
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
        <small className="form-text text-muted">영문,숫자만 조합 최소 8글자</small>
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
