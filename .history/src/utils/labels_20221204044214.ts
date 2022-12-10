export const categoryFromLabel = (label: string): string => {
  let category: string = '';
  switch (label) {
    case "INCOMMING":
      category = 'A venir';
      break;
  
    default:
      break;
  }
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