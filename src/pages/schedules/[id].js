import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { updateSchedule } from 'store/actions/schedule';

const dateFormat = 'YYYY년 MM월 DD일 HH시 MM분';

function ScheduleDetail() {
  const [data, setData] = useState({});
  const [newForm, setNewForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/schedules/${id}`).then((res) => {
        setData(res.data.data);
        setNewForm({
          title: res.data.data.title,
          description: res.data.data.description,
          date: moment(res.data.data.time).format('yyyy-MM-DD'),
          time: moment(res.data.data.time).format('HH:ss'),
        });
      });
    }
  }, [id]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewForm({ ...newForm, [name]: value });
  };

  console.log(data);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateSchedule({
        _id: id,
        title: newForm.title,
        description: newForm.description,
        time: `${newForm.date} ${newForm.time}`,
      }),
    );
    setData({
      ...newForm,
      time: moment(`${newForm.date} ${newForm.time}`, 'yyyy-MM-DD HH:ss'),
    });
    setIsEditMode(false);
  };

  return (
    <>
      <button onClick={() => router.back()}>뒤로가기</button>
      {isEditMode ? (
        <div>
          <input
            name="title"
            placeholder="제목"
            value={newForm.title}
            onChange={handleInputChange}
          />
          <input
            name="date"
            type="date"
            value={newForm.date}
            onChange={handleInputChange}
          />
          <input
            name="time"
            type="time"
            value={newForm.time}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="설명"
            value={newForm.description}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>완료</button>
        </div>
      ) : (
        <div>
          <h3>{data.title}</h3>
          <div>{moment(data.time).format(dateFormat)}</div>
          <div>{data.description}</div>
          <button onClick={() => setIsEditMode(true)}>수정</button>
        </div>
      )}
    </>
  );
}

export default ScheduleDetail;
