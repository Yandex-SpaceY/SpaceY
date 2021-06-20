import moment from 'moment';

export const formatDate = (sec: number): string => {
  let result = '';

  if (!sec) {
    return result;
  }

  const date = moment(sec);

  if (!moment().diff(date, 'days')) {
    result = date.format('HH:mm');
  } else if (!moment().diff(date, 'years')) {
    result = date.format('DD/MM');
  } else {
    result = date.format('MM/YY');
  }

  return result;
};
