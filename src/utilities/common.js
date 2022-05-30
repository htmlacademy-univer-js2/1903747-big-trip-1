import dayjs from 'dayjs';

export const upCaseFirst = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

export const humanizeDateInput = (date) => {
  if (!(date instanceof Date)) {
    return '';
  }
  return dayjs(date).format('dd/mm/YY HH:mm');
};
