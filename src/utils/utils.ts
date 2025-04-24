import { format } from 'date-fns';

export const formatDateWithSuffix = (date: string | number | Date) => {
  const day = new Date(date).getDate();
  const suffix =
    day > 3 && day < 21 ? 'th' : ['st', 'nd', 'rd', 'th'][day % 10] || 'th';
  return `${day}${suffix} ${format(new Date(date), 'MMM yyyy')}`;
};
