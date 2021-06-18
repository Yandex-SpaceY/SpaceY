import React, { FC, ReactElement } from 'react';
import cn from 'classnames';

import './button.scss';

interface IButton {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  text: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<IButton> = ({ onClick, text, className, type = 'button' }): ReactElement => {

  return (
    <button type={type} className={cn('one-button', className)} onClick={onClick}>{text}</button>
  );
};

export default Button;
