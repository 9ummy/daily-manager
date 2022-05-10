import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSchedules } from 'store/actions/schedule';
import moment from 'moment';
import styles from 'styles/schedules.module.css';
import Schedule from 'components/schedule/Schedule';

const dateFormat = 'YYYY년 MM월 DD일';

function Schedules() {
  const [date, setDate] = useState(moment().format(dateFormat));
  const [loginUser, setLoginUser] = useState(
    typeof window !== 'undefined'
      ? JSON.parse(window.localStorage.getItem('user'))
      : null,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [loginUser, dispatch]);

  const schedules = useSelector((state) =>
    state.schedule.scheduleList.filter(
      (schedule) => schedule.authorId == loginUser.id,
    ),
  );

  console.log(schedules);

  const handleDateChange = (type) => {
    const tmp = moment(date, dateFormat);
    if (type === 'prev') {
      setDate(tmp.subtract(1, 'days')).format(dateFormat);
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
      {schedules.map((schedule, idx) => (
        <Schedule key={idx} data={schedule} />
      ))}
      <button>일정 추가</button>
    </div>
  );
}

export default Schedules;
