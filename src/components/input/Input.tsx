import React from 'react';
import './input.scss';
interface IInput {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  name: string;
  title?: string;
  type?: string;
  errorText?: string;
}

const Input = (props: IInput): React.ReactElement => {
  const { onChange, name, type = 'text', title = name, errorText = '' } = props;

  return (
    <div className="one-input-block">
      <span className="title">{title}</span>
      <input className="input" onChange={onChange} name={name} type={type} />
      <span className="error-message">{errorText}</span>
    </div>
  );
};

export default Input;
