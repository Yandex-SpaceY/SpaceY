import React from 'react';
import './input.scss';
interface IInput {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  name: string;
  type: string;
  title: string;
  errorText?: string;
}

const Input = (props: IInput): React.ReactElement => {
  const { onChange, name, type, title, errorText } = props;

  return (
    <div className="one_input_block">
      <span className="one_input_block--title">{title}</span>
      <input className="one_input_block--input" onChange={onChange} name={name} type={type} />
      <span className="one_input_block--error_message">{errorText}</span>
    </div>
  );
};

export default Input;
