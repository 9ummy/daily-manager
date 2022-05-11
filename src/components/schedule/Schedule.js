import styles from 'styles/schedule.module.css';
import moment from 'moment';

function Schedule({ data, handleDeleteSchedule }) {
  const { title, description, time } = data;
  return (
    <div className={styles.container}>
      <div className={styles.time}>{moment(time).format('HH:mm')}</div>
      <div className={styles.title}>{title}</div>
      <button onClick={handleDeleteSchedule}>삭제</button>
    </div>
  );
}

export default Schedule;
