import moment, { Moment } from 'moment';

enum DATE_FORMAT {
  TODAY = 'HH:mm',
  MONTH = 'DD/MM',
  YEAR = 'MM/YY',
}

const _defineFormat = (date: Moment) => {
  let format = '';

  if (!moment().diff(date, 'days')) {
    format = DATE_FORMAT.TODAY;
  } else if (!moment().diff(date, 'years')) {
    format = DATE_FORMAT.MONTH;
  } else {
    format = DATE_FORMAT.YEAR;
  }

  return format;
};

export const formatDate = (unixDate: number, format?: DATE_FORMAT): string => {
  if (!unixDate) {
    return '';
  }

  const date = moment(unixDate);

  return date.format(format || _defineFormat(date));
};

export const fakeOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const { name, value } = e.target;
  console.log(`${name} - ${value}`);
};
export const fakeOnClick = (): void => console.log('onClick');

export const formatBigNumbers = (value: number): string => Intl.NumberFormat().format(value);
