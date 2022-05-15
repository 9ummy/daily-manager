import { useRouter } from "next/router";
import axios from "axios";

function SecessionButton() {

  const router = useRouter();

  const buttonHandler = () => {
    if(confirm("회원을 탈퇴합니다. 진행하시겠습니까?")){
      const userId = JSON.parse(localStorage.getItem("user")).id
      const pw = document.getElementById("delPw").value;
      axios.delete(`/api/user/${userId}`, { data : { pw : pw}})
        .then((response) => {
          if(response.status == 204){
            alert("비밀번호 오류로 탈퇴가 실패했습니다.")
          } else {
            alert("탈퇴가 완료되었습니다.");
            router.push('./login')
          }
        }).catch(()=>{ alert("오류가 발생했습니다.")})
    }

  }

  return (
    <div className="mb-2 row">
      <div className="col-3">
        <button
        className="btn btn-danger"
      onClick={buttonHandler}>
        탈퇴
      </button>
      </div>
      <div className="col-9">
        <input id="delPw" className="form-control" placeholder="회원 비밀번호" type="password" />
      </div>
    </div>)

}

export default SecessionButton;