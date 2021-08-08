// signup
export const DEFAULT_SIGNUP_STATE = {
  first_name: '',
  second_name: '',
  email: '',
  login: '',
  phone: '',
  password: '',
};

export type SIGNUP_TYPE = typeof DEFAULT_SIGNUP_STATE;

// login
export const DEFAULT_LOGIN_STATE = {
  login: '',
  password: '',
};

export type LOGIN_TYPE = typeof DEFAULT_LOGIN_STATE;

// profile
export const DEFAULT_PROFILE_STATE = {
  avatar: '',
  first_name: '',
  second_name: '',
  display_name: '',
  email: '',
  login: '',
  phone: '',
};

export type PROFILE_TYPE = typeof DEFAULT_PROFILE_STATE;

// password
export const DEFAULT_PASSWORD_STATE = {
  oldPassword: '',
  newPassword: '',
};

export type PASSWORD_TYPE = typeof DEFAULT_PASSWORD_STATE;

// alert
export const DEFAULT_ALERT_STATE = {
  type: 'success',
  title: '',
  text: 'Completed Successfully',
  timeout: 3000,
};

export type ALERT_TYPE = typeof DEFAULT_ALERT_STATE;
