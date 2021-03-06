const loginCheck = () => {
  if (typeof window !== 'undefined') {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && Number(new Date()) / 1000 > userData.tokenExpire) {
      localStorage.removeItem('user');
    }

    if (!userData) {
      location.href = '/user/login/';
    }

    return userData;
  }
};

exports.loginCheck = loginCheck;
