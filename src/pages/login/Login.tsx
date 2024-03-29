import React, { useEffect, FC, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { useFormik } from 'formik';

import { signIn, apiPostgresSignIn } from 'api/authApi';
import { getServiceId } from 'api/oAuthApi';
import { loginSchema } from 'schemas';
import { getUserDataFromServer, setAlert } from 'store/user/actions';
import { userAuthSelector } from 'store/user/selectors';
import { Button, Input, PageMeta } from 'components';
import { GAME_NAME, GAME_URL, PAGE_NAMES } from 'constants/commonConstants';
import { DEFAULT_LOGIN_STATE, LOGIN_TYPE } from 'constants/defaultStates';
import { LINK_TEXTS } from 'constants/linkConstants';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { ALERT_TEXTS } from 'constants/alertConstants';

import './login.scss';

const Login: FC<RouteComponentProps> = ({ history }): ReactElement => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(userAuthSelector);

  if (isAuthorized === null) {
    dispatch(getUserDataFromServer());
  }

  useEffect(() => {
    if (isAuthorized) {
      history.replace(ROUTE_CONSTANTS.GAME);
    }
  }, [isAuthorized]);

  const saveData = async (values: LOGIN_TYPE) => {
    try {
      await signIn(values);
      await apiPostgresSignIn();

      history.push(ROUTE_CONSTANTS.GAME);
    } catch (err) {
      const message = err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR;
      const alert = {
        title: ALERT_TEXTS.LOGIN,
        message,
        type: 'error'
      };

      dispatch(setAlert(alert));
    }
  };

  const authYandex = async () => {
    try {
      const { data } = await getServiceId(GAME_URL);

      if (data?.service_id) {
        location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${GAME_URL}`;
      }
    } catch (err) {
      const message = err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR;
      const alert = {
        title: ALERT_TEXTS.YANDEX_LOGIN,
        message,
        type: 'error'
      };

      dispatch(setAlert(alert));
    }
  };

  const formik = useFormik({
    initialValues: DEFAULT_LOGIN_STATE,
    validationSchema: loginSchema,
    onSubmit: saveData
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className='main login'>
      <PageMeta title={PAGE_NAMES.LOGIN} />
      <div className='content-wrapper'>
        <h1>{GAME_NAME}</h1>
        <form className='content' onSubmit={handleSubmit}>
          <h2>{PAGE_NAMES.LOGIN}</h2>
          <div className='input-wrapper'>
            <Input
              value={values.login}
              name='login'
              onChange={handleChange}
              title='login'
              onBlur={handleBlur}
              errorText={errors.login && touched.login ? errors.login : ''}
            />
          </div>
          <div className='input-wrapper'>
            <Input
              value={values.password}
              name='password'
              title='password'
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.password && touched.password ? errors.password : ''}
              type='password'
            />
          </div>

          <Button type='submit' className='button-submit' >
            {BUTTON_TEXTS.SIGNIN}
          </Button>
          <Button onClick={authYandex} className='yandex-button'>{BUTTON_TEXTS.USE_YANDEX}</Button>
          <Link to={ROUTE_CONSTANTS.SIGNUP} className='link'>
            {LINK_TEXTS.SIGNUP}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
