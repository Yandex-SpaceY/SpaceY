import React, { FC, ReactElement } from 'react';

import './input.scss';

interface IInput {
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  name: string;
  placeholder?: string;
  title?: string;
  type?: string;
  errorText?: string;
}

const Input: FC<IInput> = ({ onChange, name, type = 'text', title, errorText, placeholder }): ReactElement => {

  return (
    <div className="one-input-block">
      {title && <label htmlFor={name} className="title">{title}</label>}
      <input
        id={name}
        className="input"
        onChange={onChange}
        disabled={!onChange}
        placeholder={placeholder}
        name={name}
        type={type} />
      <span className="error-message">{errorText}</span>
    </div>
  );
};

export default Input;
