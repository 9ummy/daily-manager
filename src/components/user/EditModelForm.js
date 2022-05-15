import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateUserModel } from '../../store/actions/user';

function EditModelForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onModelSubmitHandler = (data) => {
    alert('수정되었습니다.');
    //dispatch(updateUserModel(data));
  };

  return (
    <form
      className="form border-bottom"
      onSubmit={handleSubmit(onModelSubmitHandler)}
      noValidate
    >
      <div>
        <label>모델</label>
        <input type="radio" defaultChecked={true} />
        <label>
          <Image
            height="100"
            width="100"
            src="https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/thumbnail/ysy.jpg"
            alt="model thumbnail"
          />
        </label>
      </div>
      <div>
        <label>복장</label>
        <input type="radio" defaultChecked={true} />
        <label>
          <Image
            height="100"
            width="100"
            src="https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/new_thumbnail/ysy/2.png"
            alt="model clothes"
          />
        </label>
      </div>

      <div>
        <button type="submit" className="btn btn-light m-1">
          모델 수정
        </button>
      </div>
    </form>
  );
}

export default EditModelForm;
