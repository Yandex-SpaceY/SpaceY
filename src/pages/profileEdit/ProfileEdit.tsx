import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { useFormik } from 'formik';
import cn from 'classnames';

import { changeProfile, changeProfileAvatar, updateUser } from 'api/userApi';
import { Avatar, Button, Input, PageMeta } from 'components';
import { getImageUrl } from 'utils';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { PAGE_NAMES } from 'constants/commonConstants';
import { PROFILE_TYPE } from 'constants/defaultStates';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { ALERT_TEXTS } from 'constants/alertConstants';
import { userSettingSelector, userUserDataSelector } from 'store/user/selectors';
import { setAlert, setUserData, setUserPending } from 'store/user/actions';
import { profileSchema } from 'schemas';

const ProfileEdit: FC<RouteComponentProps> = ({ history }): ReactElement => {
  const dispatch = useDispatch();
  const userData = useSelector(userUserDataSelector) as PROFILE_TYPE;
  const { theme } = useSelector(userSettingSelector);

  const [ avatar, setAvatar ] = useState<string>('');
  const [ avatarError, setAvatarError ] = useState<string>('');

  useEffect(() => {
    if (Object.keys(userData)) {
      setAvatar(getImageUrl(userData.avatar));
    }
  }, [userData]);

  const saveData = async (values: PROFILE_TYPE) => {
    try {
      dispatch(setUserPending(true));

      const response = await changeProfile(values);
      response && dispatch(setUserData(response.data));

      const alert = {
        title: ALERT_TEXTS.PROFILE_EDIT,
      };

      dispatch(setAlert(alert));
      history.push(ROUTE_CONSTANTS.PROFILE);
    } catch (err) {
      const message = err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR;
      const alert = {
        title: ALERT_TEXTS.PROFILE_EDIT,
        message,
        type: 'error'
      };

      dispatch(setAlert(alert));
    } finally {
      dispatch(setUserPending(false));
    }
  };

  const changeAvatar = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('avatar', event.currentTarget!.files![0]);

    try {
      dispatch(setUserPending(true));

      const response = await changeProfileAvatar(formData);

      if (response) {
        const newAvatar = response.data?.avatar;

        setAvatar(getImageUrl(newAvatar));
        dispatch(setUserData(response.data));
        setAvatarError('');
        await updateUser({ id: response.data.id, avatar: newAvatar });
      }
    } catch (err) {
      setAvatarError(ERROR_CONSTANTS.CHOOSE_ANOTHER_FILE);
    } finally {
      dispatch(setUserPending(false));
    }
  };

  const formik = useFormik({
    initialValues: userData,
    validationSchema: profileSchema,
    onSubmit: saveData
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className={cn('main', theme)}>
      <PageMeta title={PAGE_NAMES.PROFILE_EDIT} />
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
