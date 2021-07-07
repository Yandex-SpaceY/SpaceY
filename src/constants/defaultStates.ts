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

export type SIGNUP_KEYS = keyof SIGNUP_TYPE;

// login
export const DEFAULT_LOGIN_STATE = {
  login: '',
  password: '',
};

export type LOGIN_TYPE = typeof DEFAULT_LOGIN_STATE;

export type LOGIN_KEYS = keyof LOGIN_TYPE;

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

export type PROFILE_KEYS = keyof PROFILE_TYPE;

// password
export const DEFAULT_PASSWORD_STATE = {
  oldPassword: '',
  newPassword: '',
};

export type PASSWORD_TYPE = typeof DEFAULT_PASSWORD_STATE;

export type PASSWORD_KEYS = keyof PASSWORD_TYPE;
