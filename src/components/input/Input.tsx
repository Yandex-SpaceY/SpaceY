import React from 'react';

import './input.scss';

interface IInput {
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  name: string;
  placeholder?: string;
  title?: string;
  type?: string;
  errorText?: string;
  disabled?: boolean;
}

const Input = (props: IInput): React.ReactElement => {
  const { onChange, name, type = 'text', title, errorText, placeholder, disabled } = props;

  return (
    <div className="one-input-block">
      {title && <label htmlFor={name} className="title">{title}</label>}
      <input
        id={name}
        className="input"
        onChange={onChange}
        disabled={disabled || !onChange}
        placeholder={placeholder}
        name={name}
        type={type} />
      <span className="error-message">{errorText}</span>
    </div>
  );
};

export default Input;
