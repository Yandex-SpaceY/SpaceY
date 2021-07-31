import React, { FC, ReactElement, MouseEvent } from 'react';
import cn from 'classnames';

import './menuHamburger.scss';

interface IMenuHamburger {
  onClick?(e: MouseEvent<HTMLDivElement>): void;
  className?: string;
  isShown?: boolean;
}

const MenuHamburger: FC<IMenuHamburger> = ({ onClick, className, isShown = false }): ReactElement => {

  return (
    <div className={cn('menu-hamburger', className, (!isShown && 'hidden'))} onClick={onClick}>
      <span></span>
    </div>
  );
};

export default MenuHamburger;
