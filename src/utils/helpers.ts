import moment, { Moment } from 'moment';

import { BASE_URL } from 'constants/commonConstants';

export enum DATE_FORMAT {
  TODAY = 'HH:mm',
  MONTH = 'DD/MM',
  YEAR = 'MM/YY',
  FULL_DATE = 'DD/MM/YYYY HH:mm',
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

export const formatBigNumbers = (value: number): string => Intl.NumberFormat().format(value);

export const getImageUrl = (payload: string | null): string => {
  if (payload) {
    return `${BASE_URL}/resources${payload}`;
  }

  return '';
};

export const isServer = !(
  typeof window !== 'undefined'
);
