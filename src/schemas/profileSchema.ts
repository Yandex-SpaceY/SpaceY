import * as yup from 'yup';

import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { REG_EXPS } from 'constants/regExp';

export const profileSchema = yup.object().shape({
  avatar: yup.string().nullable(),

  first_name: yup.string()
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  second_name: yup.string()
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  display_name: yup.string()
    .typeError(ERROR_CONSTANTS.FIELD_EMPTY)
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  email: yup.string()
    .email(ERROR_CONSTANTS.EMAIL_INVALID)
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  login: yup.string()
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  phone: yup.string()
    .matches(REG_EXPS.PHONE, ERROR_CONSTANTS.PHONE_INVALID)
    .required(ERROR_CONSTANTS.FIELD_EMPTY),
});
