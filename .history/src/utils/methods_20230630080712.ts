import { isDate, parse } from 'date-fns';

export const capitalize = (data: string): string => {
  return data && data.length ? `${data[0].toUpperCase()}${data.slice(1).toLocaleLowerCase()}` : '';
};

export const slugify = (text?: string): string => {
  return text
    ? text
        .toLowerCase()
        .trim()
        .replace(/[é,è,ê]/g, 'e')
        .replace(/[à]/g, 'a')
        .replace(/[î]/g, 'i')
        .split(' ')
        .join('-')
    : '';
};

export const toTitle = (text: string): string => {
  if (!text) return text;
  if (text.length === 1) return text.toUpperCase();
  return text.charAt(0).toUpperCase() + text.slice(1, text.length);
};

export type URL_DATA = {
  route: string;
  label: string;
  index: number;
};

export const parseDateString = (value: any, originalValue: any) => {
  const parsedDate = isDate(value) ? value : parse(value, 'yyyy-MM-dd', new Date());
  return parsedDate;
};

export const todayDate = () => {
  const nowAsString = new Date().toISOString().slice(0, 10);
  const date = new Date(nowAsString);
  date.setDate(date.getDate() - 1);
  return date;
};

interface Params  {
  current: string;
  url: string;
  pattern?: string
}

export const getUrl = ({current, url, pattern= 'qr-code'}: Params) => {
  const slugifiedCurrent = slugify(current);
  return slugifiedCurrent.indexOf(pattern) > -1 ? url : slugifiedCurrent;
};

export const formattedNumber = (value: string) => {
  return String(value).replace(/(.)(?=(\d{3})+$)/g,'$1 ')
};
export const referenceLabel = (reference: string) => {
  switch (reference) {
    case 'month':
      return 'Mois';
  
    default:
      return 'Année';
  }
};
