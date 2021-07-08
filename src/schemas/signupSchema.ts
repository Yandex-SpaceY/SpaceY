import * as yup from 'yup';

import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { REG_EXPS } from 'constants/regExp';

export const signupSchema = yup.object().shape({
  first_name: yup.string()
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  second_name: yup.string()
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  email: yup.string()
    .email(ERROR_CONSTANTS.EMAIL_INVALID)
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  login: yup.string()
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  phone: yup.string()
    .matches(REG_EXPS.PHONE, ERROR_CONSTANTS.PHONE_INVALID)
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  password: yup.string()
    .matches(REG_EXPS.PASSWORD, ERROR_CONSTANTS.PASSWORD_INVALID)
    .required(ERROR_CONSTANTS.FIELD_EMPTY),
});
