import Link from 'next/link';
import styles from 'styles/schedule.module.css';
import moment from 'moment';

function Schedule({ data, handleDeleteSchedule }) {
  const { _id, title, description, time } = data;
  return (
    <div className={styles.container}>
      <div className={styles.time}>{moment(time).format('HH:mm')}</div>
      <Link href={`/schedules/${_id}`} passHref>
        <div className={styles.title}>{title}</div>
      </Link>
      <button onClick={handleDeleteSchedule}>삭제</button>
    </div>
  );
}

export default Schedule;
