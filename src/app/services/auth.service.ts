import httpCommon from '../utils/http-common';

class authServiceClass {
  login(email: string, password: string) {
    console.log('email: ' + email, ' password: ' + password);
    return httpCommon.post('auth/login', { email, password });
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
}

const authService = new authServiceClass();
export default authService;
