import React, { FC, ReactElement } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { changePassword } from 'api/userApi';
import { Button, Input, PageMeta } from 'components';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { PAGE_NAMES } from 'constants/commonConstants';
import { DEFAULT_PASSWORD_STATE, PASSWORD_TYPE } from 'constants/defaultStates';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { ALERT_TEXTS } from 'constants/alertConstants';
import { passwordSchema } from 'schemas';
import { setAlert, setUserPending } from 'store/user/actions';

import './changePassword.scss';

const ChangePassword: FC<RouteComponentProps> = ({ history }): ReactElement => {
  const dispatch = useDispatch();

  const saveData = async (values: PASSWORD_TYPE) => {
    try {
      dispatch(setUserPending(true));
      await changePassword(values);

      const alert = {
        title: ALERT_TEXTS.CHANGE_PASSWORD,
      };

      dispatch(setAlert(alert));
      history.push(ROUTE_CONSTANTS.PROFILE);
    } catch (err) {
      const message = err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR;
      const alert = {
        title: ALERT_TEXTS.CHANGE_PASSWORD,
        message,
        type: 'error'
      };

      dispatch(setAlert(alert));
    } finally {
      dispatch(setUserPending(false));
    }
  };

  const formik = useFormik({
    initialValues: DEFAULT_PASSWORD_STATE,
    validationSchema: passwordSchema,
    onSubmit: saveData
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className='main passwords'>
      <PageMeta title={PAGE_NAMES.CHANGE_PASSWORD} />
      <div className='content-wrapper'>
        <form onSubmit={handleSubmit} className='content'>
          <h2>{PAGE_NAMES.CHANGE_PASSWORD}</h2>
          <div className='input-wrapper'>
            <Input
              value={values.oldPassword}
              name='oldPassword'
              title='current password'
              onChange={handleChange}
              onBlur={handleBlur}
              type='password'
              errorText={errors.oldPassword && touched.oldPassword ? errors.oldPassword : ''}
            />
          </div>

          <div className='input-wrapper'>
            <Input
              value={values.newPassword}
              name='newPassword'
              title='new password'
              onChange={handleChange}
              onBlur={handleBlur}
              type='password'
              errorText={errors.newPassword && touched.newPassword ? errors.newPassword : ''}
            />
          </div>

          <div className='button-wrapper'>
            <Button type='submit'>{BUTTON_TEXTS.SAVE}</Button>
          </div>

          <Link to={ROUTE_CONSTANTS.PROFILE} className='link'>
            {LINK_TEXTS.PROFILE}
          </Link>
          <Link to={ROUTE_CONSTANTS.GAME} className='link'>
            {LINK_TEXTS.GAME}
          </Link>
        </form>
      </div>
    </div >
  );
};

export default withRouter(ChangePassword);
