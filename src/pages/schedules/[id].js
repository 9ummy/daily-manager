import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { updateSchedule } from 'store/actions/schedule';
import styles from 'styles/scheduleDetail.module.css';

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
    <div className="container w-50">
      {isEditMode ? (
        <div className={`card ${styles.editCard}`}>
          <h3>일정 수정하기</h3>
          <div>
            <label className="form-label" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              className="form-control"
              name="title"
              placeholder="제목"
              value={newForm.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="date">
              날짜
            </label>
            <input
              id="date"
              className="form-control"
              name="date"
              type="date"
              value={newForm.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="time">
              시간
            </label>
            <input
              id="time"
              className="form-control"
              name="time"
              type="time"
              value={newForm.time}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="description">
              설명
            </label>
            <textarea
              id="description"
              className="form-control"
              name="description"
              placeholder="설명"
              value={newForm.description}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleUpdate}>
            완료
          </button>
        </div>
      ) : (
        <div className={`card ${styles.card}`}>
          <h3>{data.title}</h3>
          <div>{moment(data.time).format('YYYY년 MM월 DD일')}</div>
          <div>{moment(data.time).format('HH시 MM분')}</div>
          <div>{data.description}</div>
          <div className={styles.buttonContainer}>
            <button
              className="btn btn-outline-primary"
              onClick={() => router.back()}
            >
              뒤로가기
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setIsEditMode(true)}
            >
              수정
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleDetail;
