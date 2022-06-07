import dayjs from 'dayjs';
import {FilterType} from '../const';

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

export const isDatesEqual = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return true;
  }

  return dayjs(dateA).isSame(dateB, 'day');
};

export const filter = {
  [FilterType.EVERYTHING]: (events) => events.slice(),
  [FilterType.FUTURE]: (events) => events.filter((task) => task.dateTo > new Date()),
  [FilterType.PAST]: (events) => events.filter((task) => task.dateTo < new Date())
};
