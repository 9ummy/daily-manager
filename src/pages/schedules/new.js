import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { addSchedule } from 'store/actions/schedule';
import { loginCheck } from 'utils/loginCheck';

const dateFormat = 'yyyy-MM-DD';
const timeFormat = 'HH:ss';

function NewSchedule() {
  const [form, setForm] = useState({
    authorId: '',
    token: '',
    date: moment().format(dateFormat),
    time: moment().format(timeFormat),
    title: '',
    description: '',
  });
  const loginUser = loginCheck();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) {
      alert('일정 제목을 입력해주세요');
    } else {
      const requestForm = {
        authorId: loginUser.id,
        time: `${form.date} ${form.time}`,
        title: form.title,
        description: form.description,
      };
      dispatch(addSchedule(requestForm));
      router.push('/schedules');
    }
  };

  return (
    <form
      className="container w-50"
      id="new-schedule-form"
      onSubmit={handleSubmit}
    >
      <h2>새 일정 등록</h2>
      <div>
        <label className="form-label" htmlFor="date">
          날짜
        </label>
        <input
          className="form-control"
          name="date"
          type="date"
          value={form.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="time">
          시간
        </label>
        <input
          className="form-control"
          name="time"
          type="time"
          value={form.time}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="title">
          제목
        </label>
        <input
          className="form-control"
          name="title"
          value={form.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="description">
          설명
        </label>
        <textarea
          className="form-control"
          name="description"
          value={form.description}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="btn btn-primary m-1"
        type="submit"
        form="new-schedule-form"
      >
        등록하기
      </button>
    </form>
  );
}

export default NewSchedule;
