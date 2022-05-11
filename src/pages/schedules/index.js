import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSchedules } from 'store/actions/schedule';
import moment from 'moment';
import styles from 'styles/schedules.module.css';
import Schedule from 'components/schedule/Schedule';
import { deleteSchedule } from 'store/actions/schedule';
import { loginCheck } from 'utils/loginCheck';

const dateFormat = 'YYYY년 MM월 DD일';

function Schedules() {
  const loginUser = loginCheck();
  const dispatch = useDispatch();
  const router = useRouter();

  const [date, setDate] = useState(moment().format(dateFormat));

  const scheduleState = useSelector((state) => state.schedule);

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch]);

  const handleDateChange = (type) => {
    const tmp = moment(date, dateFormat);
    if (type === 'prev') {
      setDate(tmp.subtract(1, 'days').format(dateFormat));
    }
    if (type === 'next') {
      setDate(tmp.add(1, 'days').format(dateFormat));
    }
  };

  return (
    <div className={styles.container}>
      <h2>My Schedules</h2>
      <div className={styles.dateSelector}>
        <button onClick={() => handleDateChange('prev')}>prev</button>
        <h3>{date}</h3>
        <button onClick={() => handleDateChange('next')}>next</button>
      </div>
      {scheduleState.scheduleList
        .filter((schedule) => schedule.authorId === loginUser.id)
        .map((schedule, idx) => (
          <Schedule
            key={idx}
            data={schedule}
            handleDeleteSchedule={() => {
              dispatch(deleteSchedule(schedule._id));
              dispatch(fetchSchedules());
            }}
          />
        ))}
      <button onClick={() => router.push('/schedules/new')}>일정 추가</button>
    </div>
  );
}

export default Schedules;
