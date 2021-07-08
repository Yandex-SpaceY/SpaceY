import * as yup from 'yup';

import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { REG_EXPS } from 'constants/regExp';

export const passwordSchema = yup.object().shape({
  oldPassword: yup.string()
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  newPassword: yup.string()
    .matches(REG_EXPS.PASSWORD, ERROR_CONSTANTS.PASSWORD_INVALID)
    .required(ERROR_CONSTANTS.FIELD_EMPTY),
});
