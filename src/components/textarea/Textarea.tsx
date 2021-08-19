import React, { FC, ReactElement, ChangeEvent } from 'react';
import cn from 'classnames';
import sanitizeHtml from 'sanitize-html';

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

  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value = sanitizeHtml(e.target.value);

    onChange && onChange(e);
  };

  return (
    <textarea
      className={cn('textarea', className)}
      name={name}
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={onTextareaChange}
    />
  );
};

export default Textarea;
