export const ERROR_CONSTANTS = {
  EMAIL_INVALID: 'This email address is not valid',
  FIELD_EMPTY: 'Cannot be blank',
  PASSWORD_INVALID: 'Password must contain at least 8 characters, including lowercase letter(s), uppercase letter(s) and digit(s)',
  PHONE_INVALID: 'This phone number is invalid',
};

export const GET_ERROR_MESSAGE = {
  NOT_NEGATIVE_NUMBER: (title: string, value: number): string => (
    `${title} shouldn't be a negative number, but receive ${value}`
  ),
  NOT_GREATER: (title1: string, title2: string, value1: number, value2: number): string => (
    `${title1} (${value1}) shouldn't be greater than ${title2} (${value2})`
  ),
};
