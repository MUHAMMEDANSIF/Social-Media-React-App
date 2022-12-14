import axios from './Axios.instence';

axios.defaults.withCredentials = true;

export const jwtverifycation = async (callback) => {
  try {
    const response = await axios.get('/auth/jwtveryfication', {
      withCredentials: true,
    });
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const Login = async (formdata, callback) => {
  try {
    const user = await axios.post('/auth/login', formdata, {
      withCredentials: true,
    });
    if (user) {
      callback(user);
    } else {
      callback('error');
    }
  } catch (err) {
    callback(err);
  }
};

export const Signup = async (formdata, callback) => {
  try {
    const user = await axios.post('/auth/newuser/signup', formdata, {
      withCredentials: true,
    });
    if (user) {
      callback(user);
    } else {
      callback('error');
    }
  } catch (err) {
    callback(err);
  }
};

export const sendotp = async (email, callback) => {
  try {
    const response = await axios.post('/auth/send-otp', { email });
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const otpverification = async (otp, callback) => {
  try {
    const response = await axios.post('/auth/Otp-verification', { OTP: otp });
    console.log(response);
    callback(response);
  } catch (err) {
    callback(err);
  }
};
