import React, { FC, ReactElement, MouseEvent } from 'react';
import cn from 'classnames';

import './button.scss';

interface IButton {
  onClick(e: MouseEvent<HTMLButtonElement>): void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<IButton> = ({ onClick, className, children, type = 'button' }): ReactElement => {

  return (
    <button type={type} className={cn('one-button', className)} onClick={onClick}>{children}</button>
  );
};

export default Button;
