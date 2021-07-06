import React, { FC, ReactElement, ChangeEvent } from 'react';
import cn from 'classnames';

import './input.scss';

interface IInput {
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  accept?: string;
  className?: string,
  errorText?: string;
  name?: string;
  placeholder?: string;
  title?: string | ReactElement;
  type?: string;
  value?: string;
}

const Input: FC<IInput> = ({ accept, className, name, value, type = 'text', title, errorText, placeholder, onChange }): ReactElement => {

  return (
    <div className={cn('one-input-block', className, { error: errorText })}>
      {title && <label htmlFor={name} className='title'>{title}</label>}
      <input
        accept={accept}
        id={name}
        className='input'
        onChange={onChange}
        disabled={!onChange}
        placeholder={placeholder}
        name={name}
        value={value}
        type={type} />
      <span className='error-message'>{errorText}</span>
    </div>
  );
};

export default Input;
