import React, { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/input/Input';
import Button from 'components/button/Button';
import { fakeOnChange, fakeOnClick } from 'utils';
import { defaultUserState, GAME_NAME, LINK_TEXTS, PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Signup: FC = (): ReactElement => {
  const [state] = useState(defaultUserState);

  return (
    <div className='main'>
      <div className='content-wrapper double'>
        <h1>{GAME_NAME}</h1>
        <form className='content'>
          <h2>{PAGE_NAMES.REGISTRATION}</h2>
          <div className='input-wrapper'>
            <Input value={state.name} name='name' title='name' onChange={fakeOnChange} />
            <Input value={state.surname} name='surname' title='surname' onChange={fakeOnChange} />
          </div>
          <div className='input-wrapper'>
            <Input value={state.email} name='email' onChange={fakeOnChange} title='e-mail' type='email' />
            <Input value={state.codename} name='codename' title='codename' onChange={fakeOnChange} />
          </div>
          <div className='input-wrapper'>
            <Input value={state.phone} name='phone' title='phone' onChange={fakeOnChange} />
            <Input value={state.password} name='password' title='password' onChange={fakeOnChange} type='password' />
          </div>
          <div className='button-wrapper'>
            <Button onClick={fakeOnClick}>CHECK IN</Button>
          </div>
          <Link to={ROUTE_CONSTANTS.LOGIN} className='link'>{LINK_TEXTS.LOGIN}</Link>
          <Link to={ROUTE_CONSTANTS.DASHBOARD} className='link'>{LINK_TEXTS.DASHBOARD}</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
