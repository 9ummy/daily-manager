import styles from 'styles/schedule.module.css';
import moment from 'moment';

function Schedule({ data }) {
  const { title, description, time } = data;
  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.time}>{moment(time).format('HH:mm')}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.buttonContainer}>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
}

export default Schedule;
