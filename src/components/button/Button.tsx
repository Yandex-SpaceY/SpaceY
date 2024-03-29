import React, { FC, ReactElement, MouseEvent } from 'react';
import cn from 'classnames';

import './button.scss';

interface IButton {
  onClick?(e: MouseEvent<HTMLButtonElement>): void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<IButton> = ({ onClick, className, disabled = false, children, type = 'button' }): ReactElement => {

  return (
    <button type={type} disabled={disabled} className={cn('one-button', className)} onClick={onClick}>{children}</button>
  );
};

export default Button;
