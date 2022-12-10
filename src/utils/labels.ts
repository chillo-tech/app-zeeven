import { CATEGORIES } from "./data";

export const categoryFromLabel = (label: string): string => {
  let category: string = '';
  category = CATEGORIES.filter(category => category.value === label).map(category => category.label)[0];
  return category;
}
export const statusFromLabel = (label: string): string => {
  let status: string = '';
  switch (label) {
    case "INCOMMING":
      status = 'A venir';
      break;
    case "ACTIVE":
      status = 'En cours';
      break;
    case "DISABLED":
      status = 'Terminé';
      break;
  }
  return status;
}