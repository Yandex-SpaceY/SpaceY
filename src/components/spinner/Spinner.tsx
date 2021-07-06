import React, { FC, ReactElement } from 'react';

import { SPINNER_CONSTANTS } from 'constants/spinnerConstants';

import './spinner.scss';

const Spinner: FC = (): ReactElement => (
  <div className='spinner'>
    <span>{SPINNER_CONSTANTS.LOADING}</span>
    <span className='spinner-item'>{SPINNER_CONSTANTS.PERIOD}</span>
    <span className='spinner-item'>{SPINNER_CONSTANTS.PERIOD}</span>
    <span className='spinner-item'>{SPINNER_CONSTANTS.PERIOD}</span>
  </div>
);

export default Spinner;
