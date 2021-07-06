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
      className={cn('avatar', !onChange && 'disabled')}
      errorText={errorText}
      onChange={onChange}
      name='upload-file'
      type='file'
      accept='image/*'
      title={src ? <img src={src} alt='avatar' /> : <span className='no-image-text'>{AVATAR_CONSTANTS.NO_IMAGE}</span>}
    />
  </div>
);

export default Avatar;
