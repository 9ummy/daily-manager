import Link from 'next/link';
import styles from 'styles/schedule.module.css';
import moment from 'moment';

function Schedule({ data, handleDeleteSchedule }) {
  const { _id, title, description, time } = data;
  return (
    <li className={`${styles.container} list-group-item`}>
      <div className={styles.time}>{moment(time).format('HH:mm')}</div>
      <Link href={`/schedules/${_id}`} passHref>
        <div className={styles.title}>{title}</div>
      </Link>
      <button
        className="btn btn-outline-primary"
        onClick={handleDeleteSchedule}
      >
        삭제
      </button>
    </li>
  );
}

export default Schedule;
