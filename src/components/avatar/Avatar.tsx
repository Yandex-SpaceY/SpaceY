import React, { FC, ReactElement, ChangeEvent } from 'react';
import cn from 'classnames';

import { Input } from 'components';
import { AVATAR_CONSTANTS } from 'constants/avatarConstants';
import './avatar.scss';

interface IAvatar {
  className?: string;
  errorText?: string,
  src?: string,
  onChange?(event: ChangeEvent<HTMLInputElement>): Promise<void> | void;
}

const Avatar: FC<IAvatar> = ({ className, errorText, src, onChange }): ReactElement => (
  <div className={cn('avatar-wrapper', className)} >
    <Input
      accept='image/*'
      className={cn('avatar', !onChange && 'disabled')}
      errorText={errorText}
      name='upload-file'
      title={src ? <img src={src} alt='avatar' /> : <span className='no-image-text'>{AVATAR_CONSTANTS.NO_IMAGE}</span>}
      type='file'
      onChange={onChange}
    />
  </div>
);

export default Avatar;
