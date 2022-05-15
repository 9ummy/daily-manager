import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUserPassword } from "../../store/actions/user";

function EditPwForm(){
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const checkPwValidation = (pw) => {
    return pw.length >= 8 && /^(?=[a-z0-9]*$)(?:\d+[a-z]|[a-z]+\d)[a-z\d]*$/i.test(pw);
  }


  const onPasswordSubmitHandler = (data) => {
    if (data){
      if (data.newPw !== data.newCpw) {
        alert('입력된 암호와 확인 암호가 다릅니다!');
        return;
      } else if (checkPwValidation(data.newPw) === false){
        alert('올바르지 못한 비밀번호 입니다.');
        return;
      }
    }
    dispatch(updateUserPassword(data));
  }

  return (
    <form className="form border-bottom" onSubmit={handleSubmit(onPasswordSubmitHandler)} noValidate>
      <div className="mb-2">
        <input
          type="password"
          id="pwInput"
          name="pw"
          placeholder="기존 비밀번호"
          className="form-control"
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-2">
        <input
          type="password"
          id="newPasswordInput"
          name="newPw"
          placeholder="새 비밀번호"
          className="form-control"
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-2">
        <input
          type="password"
          id="pwConfirmInput"
          name="newCpw"
          placeholder="새 비밀번호 확인"
          className="form-control"
          ref={register({ required: true })}
        />
        <small className="form-text text-muted">영문,숫자만 조합 최소 8글자</small>
      </div>
      <div>
        <button type="submit" className="btn btn-light m-1">
          비밀번호 변경
        </button>
      </div>
    </form>
  )

}

export default EditPwForm;