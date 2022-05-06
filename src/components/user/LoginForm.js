import {useDispatch, useSelector} from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from '../../store/actions/user';
import { useRouter } from "next/router";

export function LoginForm(){
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmitHandler = (data) => {
    if(data){
      dispatch(loginUser(data));
      //TODO : 일정 리스트 생성 router.push("/sacContent")
    }
  }

  return (
    <form className="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
    >
      <div className={"form__element"}>
        <label className={"label"} htmlFor="idInput">
          id
        </label>
        <input
          type="text"
          id="idInput"
          name="id"
          placeholder="id"
          className="input"
          ref={register({ required: true })}
        />
      </div>

      <div className={"form__element"}>
        <label className={"label"} htmlFor="pwInput">
          password
        </label>
        <input
          type="password"
          id="pwInput"
          name="pw"
          placeholder="password"
          className="input"
          ref={register({ required : true })}
        />
      </div>

      <div className="form__action">
        <button className="btn btn__primary btn__icon" type="submit">
          로그인
        </button>
      </div>
    </form>
  );
}