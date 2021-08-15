import React, { FC, ReactElement, ChangeEvent } from 'react';
import cn from 'classnames';

import './textarea.scss';

interface ITextarea {
  className?: string,
  name?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?(e: ChangeEvent<HTMLTextAreaElement>): void;
}

const Textarea: FC<ITextarea> = (props): ReactElement => {
  const {
    className,
    name,
    placeholder,
    rows,
    value,
    onChange,
  } = props;

  return (
    <textarea
      className={cn('textarea', className)}
      name={name}
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={onChange}
    />
  );
};

export default Textarea;
