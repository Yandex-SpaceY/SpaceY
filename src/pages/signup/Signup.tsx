import React, { FC, ReactElement } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { useFormik } from 'formik';

import { signup } from 'api/authApi';
import { Button, Input } from 'components';
import { GAME_NAME, PAGE_NAMES } from 'constants/commonConstants';
import { DEFAULT_SIGNUP_STATE, SIGNUP_TYPE } from 'constants/defaultStates';
import { LINK_TEXTS } from 'constants/linkConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { signupSchema } from 'schemas';

const Signup: FC<RouteComponentProps> = ({ history }): ReactElement => {
  const onSubmitHandler = async (values: SIGNUP_TYPE) => {
    try {
      await signup(values);

      history.push(ROUTE_CONSTANTS.GAME);
    } catch (err) {
      console.error(err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR);
    }
  };

  const formik = useFormik({
    initialValues: DEFAULT_SIGNUP_STATE,
    validationSchema: signupSchema,
    onSubmit: onSubmitHandler
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className='main'>
      <div className='content-wrapper double'>
        <h1>{GAME_NAME}</h1>
        <form className='content' onSubmit={handleSubmit}>
          <h2>{PAGE_NAMES.REGISTRATION}</h2>
          <div className='input-wrapper'>
            <Input
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              name='first_name'
              title='first name'
              errorText={errors.first_name && touched.first_name ? errors.first_name : ''}
            />
            <Input
              value={values.second_name}
              name='second_name'
              title='second name'
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.second_name && touched.second_name ? errors.second_name : ''}
            />
          </div>

          <div className='input-wrapper'>
            <Input
              value={values.email}
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              title='e-mail'
              type='email'
              errorText={errors.email && touched.email ? errors.email : ''}
            />
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
              value={values.phone}
              name='phone'
              title='phone'
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.phone && touched.phone ? errors.phone : ''}
            />
            <Input
              value={values.password}
              name='password'
              title='password'
              onChange={handleChange}
              onBlur={handleBlur}
              type='password'
              errorText={errors.password && touched.password ? errors.password : ''}
            />
          </div>

          <div className='button-wrapper'>
            <Button type='submit'>{BUTTON_TEXTS.SIGNUP}</Button>
          </div>

          <Link to={ROUTE_CONSTANTS.LOGIN} className='link'>{LINK_TEXTS.LOGIN}</Link>
          <Link to={ROUTE_CONSTANTS.GAME} className='link'>{LINK_TEXTS.GAME}</Link>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Signup);
