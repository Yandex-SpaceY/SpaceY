import * as yup from 'yup';

import { ERROR_CONSTANTS } from 'constants/errorConstants';

export const loginSchema = yup.object().shape({
  login: yup.string()
    .required(ERROR_CONSTANTS.FIELD_EMPTY),

  password: yup.string()
    .required(ERROR_CONSTANTS.FIELD_EMPTY),
});
