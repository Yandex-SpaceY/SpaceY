import { ERROR_CONSTANTS } from 'constants/errorConstants';

const checkEmail = (email: string): string => {
  const pattern = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  return pattern.test(email) ? '' : ERROR_CONSTANTS.EMAIL_INVALID;
};

const checkPassword = (password: string): string => {
  const pattern = /(?=.*\d)(?=.*[a-z/а-я])(?=.*[A-Z/А-Я]).{8,}/;

  return pattern.test(password) ? '' : ERROR_CONSTANTS.PASSWORD_INVALID;
};

const checkFieldNotEmpty = (value: string): string => value ? '' : ERROR_CONSTANTS.FIELD_EMPTY;

const checkPhone = (phone = ''): string => {
  const pattern = /^((8|\+7)[- ]?)?((\?\d{3})?[- ]?)?[\d- ]{7,10}$/;

  return pattern.test(phone.replace(' ', '')) ? '' : ERROR_CONSTANTS.PHONE_INVALID;
};

export {
  checkEmail,
  checkFieldNotEmpty,
  checkPassword,
  checkPhone,
};
