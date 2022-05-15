import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styles from 'styles/header.module.css';
import { logoutUser } from 'store/actions/user';

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <header className={styles.header}>
      <button className="btn btn-link" onClick={()=>router.push("/schedules")}>
        <Image src="/logo.png" alt="daily manager logo" width="140" height="60" />
      </button>
      <div className={styles.buttonContainer}>
        <button
          className="btn btn-outline-primary"
          onClick={() => router.push('/user/edit')}
        >
          회원 정보 수정
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(logoutUser());
            router.push('/user/login');
          }}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}

export default Header;
