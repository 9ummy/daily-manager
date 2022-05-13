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

  useEffect(() => {
    const interVal = setInterval(() => {
      let scheduleInTime = scheduleState.scheduleList.filter( (v) => { return parseInt(new Date(v.time)/1000) == parseInt(new Date()/1000) });
      if(scheduleInTime.length > 0){
        console.log(scheduleInTime[0].videoKey);
      }
    }, 1000);
    return () => clearInterval(interVal);
  }, [scheduleState]);

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
    <div className={`${styles.container} container`}>
      <h1>My Schedules</h1>
      <div className={styles.dateSelector}>
        <button
          className="btn btn-primary"
          onClick={() => handleDateChange('prev')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-left-fill"
            viewBox="0 0 16 16"
          >
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
        </button>
        <h3>{date}</h3>
        <button
          className="btn btn-primary"
          onClick={() => handleDateChange('next')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-right-fill"
            viewBox="0 0 16 16"
          >
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
        </button>
      </div>
      <ul className="list-group list-group-flush" style={{ width: '100%' }}>
        {scheduleState.scheduleList
          .filter(
            (schedule) =>
              schedule.authorId === loginUser.id &&
              moment(schedule.time).format(dateFormat) === date,
          )
          .map((schedule, idx) => (
            <Schedule
              key={idx}
              data={schedule}
              handleDeleteSchedule={() => {
                dispatch(deleteSchedule(schedule._id));
              }}
            />
          ))}
      </ul>
      <button
        className="btn btn-link"
        onClick={() => router.push('/schedules/new')}
      >
        일정 추가
      </button>
    </div>
  );
}

export default Schedules;
