import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUserPassword } from "../../store/actions/user";

function EditPwForm(){
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onPasswordSubmitHandler = (data) => {
    if (data){
      if (data.newPw !== data.newCpw) {
        alert('입력된 암호와 확인 암호가 다릅니다!');
        return;
      }
    }
    dispatch(updateUserPassword(data));
  }

  return (
    <form className="form" onSubmit={handleSubmit(onPasswordSubmitHandler)} noValidate>
      <div>
        <label htmlFor="pwInput">
          password
        </label>
        <input
          type="password"
          id="pwInput"
          name="pw"
          placeholder="password"
          className="input"
          ref={register({ required: true })}
        />
      </div>
      <div>
        <label htmlFor="newPasswordInput">
          new password
        </label>
        <input
          type="password"
          id="newPasswordInput"
          name="newPw"
          placeholder="password"
          className="input"
          ref={register({ required: true })}
        />
      </div>
      <div>
        <label htmlFor="pwConfirmInput">
          new password confirm
        </label>
        <input
          type="password"
          id="pwConfirmInput"
          name="newCpw"
          placeholder="password confirm"
          className="input"
          ref={register({ required: true })}
        />
      </div>
      <div>
        <button type="submit">
          수정
        </button>
      </div>
    </form>
  )

}

export default EditPwForm;