import React, { FC, ReactElement, ChangeEvent } from 'react';
import cn from 'classnames';

import './input.scss';

interface IInput {
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  name: string;
  value: string;
  placeholder?: string;
  title?: string;
  type?: string;
  errorText?: string;
}

const Input: FC<IInput> = ({ onChange, name, value, type = 'text', title, errorText, placeholder }): ReactElement => {

  return (
    <div className={cn('one-input-block', { error: errorText })}>
      {title && <label htmlFor={name} className="title">{title}</label>}
      <input
        id={name}
        className="input"
        onChange={onChange}
        disabled={!onChange}
        placeholder={placeholder}
        name={name}
        value={value}
        type={type} />
      <span className="error-message">{errorText}</span>
    </div>
  );
};

export default Input;
