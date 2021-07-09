import React, { FC, ReactElement, FocusEvent, ChangeEvent } from 'react';
import cn from 'classnames';

import './input.scss';

interface IInput {
  accept?: string;
  className?: string,
  errorText?: string;
  name?: string;
  placeholder?: string;
  title?: string | ReactElement;
  type?: string;
  value?: string;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
}

const Input: FC<IInput> = ({
  accept,
  className,
  errorText,
  name,
  placeholder,
  title,
  type = 'text',
  value,
  onBlur,
  onChange,
}): ReactElement => (
  <div className={cn('one-input-block', className, { error: errorText })}>
    {title && <label htmlFor={name} className='title'>{title}</label>}
    <input
      accept={accept}
      className='input'
      disabled={!onChange}
      id={name}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
    <span className='error-message'>{errorText}</span>
  </div>
);

export default Input;
