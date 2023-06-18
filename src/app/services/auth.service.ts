import httpCommon from '../utils/http-common';

class authServiceClass {
  login(email: string, password: string) {
    console.log('email: ' + email, ' password: ' + password);
    return httpCommon.post(
      'auth/login',
      { email, password },
      { withCredentials: true }
    );
  }

  register(
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    dob: string,
    password: string
  ) {
    return httpCommon.post('auth/register', {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      dob: dob,
      email: email,
      password: password,
    });
  }

  refresh() {
    return httpCommon.get('auth/refresh', { withCredentials: true });
  }

  logout() {
    return httpCommon.post('auth/logout', {}, { withCredentials: true });
  }
}

const authService = new authServiceClass();
export default authService;
