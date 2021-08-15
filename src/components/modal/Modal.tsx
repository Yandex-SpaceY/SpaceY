import React, { FC, ReactElement, useEffect } from 'react';
import cn from 'classnames';

import { GAME_CONTROLS } from 'game/constants';

import './modal.scss';

interface IModal {
  children: ReactElement;
  className?: string;
  handleClear: () => void;
  visible?: boolean;
}

const Modal: FC<IModal> = ({
  children,
  className,
  handleClear,
  visible
}): ReactElement | null => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return (() => document.removeEventListener('keydown', closeModal));
  });

  const closeModal = (event: KeyboardEvent): void => {
    if (event.code === GAME_CONTROLS.PAUSE) {
      handleClear();
    }
  };

  return (
    visible
      ? (
        <div className={cn('modal', className)}>
          <div className='overlay' onClick={handleClear} />
          <div className='modal-content'>
            {children}
          </div>
        </div>
      ) : null
  );
};

export default Modal;
