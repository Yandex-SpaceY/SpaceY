import React from 'react';
import './button.scss';
interface IButton {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  text: string;
}

const Button = (props: IButton): React.ReactElement => {
  const { onClick, text } = props;

  return (
    <button className="one-button" onClick={onClick}>{text}</button>
  );
};

export default Button;