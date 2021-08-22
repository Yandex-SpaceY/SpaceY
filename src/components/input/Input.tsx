import React, { FC, ReactElement, FocusEvent, ChangeEvent } from 'react';
import cn from 'classnames';
import sanitizeHtml from 'sanitize-html';

import './input.scss';

interface IInput {
  accept?: string;
  className?: string,
  errorText?: string;
  name?: string;
  placeholder?: string;
  title?: string | ReactElement;
  type?: string;
  value?: string;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
}

const Input: FC<IInput> = (props): ReactElement => {
  const {
    accept,
    className,
    errorText,
    name,
    placeholder,
    title,
    type = 'text',
    value,
    onBlur,
    onChange,
  } = props;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = sanitizeHtml(e.target.value);

    onChange && onChange(e);
  };

  return (
    <div className={cn('one-input-block', className, { error: errorText })}>
      {title && <label htmlFor={name} className='title'>{title}</label>}
      <input
        accept={accept}
        className='input'
        disabled={!onChange}
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onInputChange}
      />
      <span className='error-message'>{errorText}</span>
    </div>
  );
};

export default Input;
