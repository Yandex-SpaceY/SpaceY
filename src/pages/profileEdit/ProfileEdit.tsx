import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { useFormik } from 'formik';

import { changeProfile, changeProfileAvatar } from 'api/userApi';
import { Avatar, Button, Input } from 'components';
import { getImageUrl } from 'utils';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { PAGE_NAMES } from 'constants/commonConstants';
import { PROFILE_TYPE } from 'constants/defaultStates';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { profileSchema } from 'schemas';
import { setUserData } from 'store/user/actions';
import { userUserDataSelector } from 'store/user/selectors';

const ProfileEdit: FC<RouteComponentProps> = ({ history }): ReactElement => {
  const dispatch = useDispatch();
  const userData = useSelector(userUserDataSelector) as PROFILE_TYPE;

  const [ avatar, setAvatar ] = useState<string>('');
  const [ avatarError, setAvatarError ] = useState<string>('');

  useEffect(() => {
    if (Object.keys(userData)) {
      setAvatar(getImageUrl(userData.avatar));
    }
  }, [userData]);

  const onSubmitHandler = async (values: PROFILE_TYPE) => {
    try {
      const response = await changeProfile(values);
      response && dispatch(setUserData(response.data));

      history.push(ROUTE_CONSTANTS.PROFILE);
    } catch (err) {
      console.error(err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR);
    }
  };

  const changeAvatar = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('avatar', event.currentTarget!.files![0]);

    try {
      const response = await changeProfileAvatar(formData);

      if (response) {
        const newAvatar = response.data?.avatar;
        setAvatar(getImageUrl(newAvatar));
        dispatch(setUserData(response.data));
        setAvatarError('');
      }
    } catch (err) {
      setAvatarError(ERROR_CONSTANTS.CHOOSE_ANOTHER_FILE);
    }
  };

  const formik = useFormik({
    initialValues: userData,
    validationSchema: profileSchema,
    onSubmit: onSubmitHandler
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className='main'>
      <div className='content-wrapper double'>
        <form className='content' onSubmit={handleSubmit}>
          <h2>{PAGE_NAMES.PROFILE_EDIT}</h2>
          <Avatar errorText={avatarError} src={avatar} onChange={changeAvatar}/>
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
              value={values.display_name || ''}
              name='display_name'
              title='display name'
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.display_name && touched.display_name ? errors.display_name : ''}
            />
            <Input
              value={values.phone}
              name='phone'
              title='phone'
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.phone && touched.phone ? errors.phone : ''}
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

export default withRouter(ProfileEdit);
