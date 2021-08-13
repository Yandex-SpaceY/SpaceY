import React, { FC, ReactElement, ChangeEvent } from 'react';
import cn from 'classnames';

import './textarea.scss';

interface ITextarea {
  className?: string,
  name?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  onChange?(e: ChangeEvent<HTMLTextAreaElement>): void;
}

const Textarea: FC<ITextarea> = ({
  className,
  name,
  placeholder,
  rows,
  value,
  onChange,
}): ReactElement => (
  <textarea
    className={cn('textarea', className)}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={rows}
  />
);

export default Textarea;
