import React, { FC, ReactElement, useEffect } from 'react';
import cn from 'classnames';

import { GAME_CONTROLS } from 'game/constants';

import './modal.scss';

interface IModal {
  actions?: ReactElement;
  className?: string;
  description?: ReactElement;
  handleClear: () => void;
  visible?: boolean;
}

const Modal: FC<IModal> = ({
  actions,
  className,
  description,
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
      ? <div className={cn('modal', className)}>
        <div className='overlay' onClick={handleClear} />
        <div className='modal-content'>
          <div className='description'>{description}</div>
          <div className='action-buttons'>{actions}</div>
        </div>
      </div>
      : null
  );
};

export default Modal;
