import React, { FC, ReactElement } from 'react';

import './modalContent.scss';

interface IModalContent {
  actions?: ReactElement;
  description?: ReactElement;
}

const ModalContent: FC<IModalContent> = ({
  actions,
  description,
}): ReactElement => (
  <>
    <div className='description'>{description}</div>
    <div className='action-buttons'>{actions}</div>
  </>
);

export default ModalContent;
