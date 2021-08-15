import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { SPINNER_CONSTANTS } from 'constants/spinnerConstants';
import { userPendingSelector } from 'store/user/selectors';

import './spinner.scss';

const Spinner: FC = (): ReactElement => {
  const isPending = useSelector(userPendingSelector);

  const [ isShown, setIsShown ] = useState<boolean>(false);

  useEffect(() => {
    if (isPending) {
      setIsShown(isPending);
    } else {
      setTimeout(() => {
        setIsShown(isPending);
      }, SPINNER_CONSTANTS.TIMEOUT);
    }
  }, [isPending]);

  return (
    <div className={cn('spinner', (!isShown && 'hidden'))}>
      <span>{SPINNER_CONSTANTS.LOADING}</span>
      <span className='spinner-item'>{SPINNER_CONSTANTS.PERIOD}</span>
      <span className='spinner-item'>{SPINNER_CONSTANTS.PERIOD}</span>
      <span className='spinner-item'>{SPINNER_CONSTANTS.PERIOD}</span>
    </div>
  );
};

export default Spinner;
