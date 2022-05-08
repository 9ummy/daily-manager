import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSchedules } from 'store/actions/schedule';

function Schedules() {
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

  return <div>Hello</div>;
}

export default Schedules;
