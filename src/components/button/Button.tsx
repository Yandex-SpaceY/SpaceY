import React from 'react';

import './button.scss';
interface IButton {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  text: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = (props: IButton): React.ReactElement => {
  const { onClick, text, className, type = 'button' } = props;

  return (
    <button type={type} className={`one-button ${className}`} onClick={onClick}>{text}</button>
  );
};

export default Button;
