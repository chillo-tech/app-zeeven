export const categoryFromLabel = (label: string) => {
  let category: string = '';
  switch (label) {
    case "INCOMMING":
      category = 'A venir';
      break;
  
    default:
      break;
  }

}
export const statusFromLabel = (label: string): string => {
  let status: string = '';
  switch (label) {
    case "INCOMMING":
      status = 'A venir';
      break;
  
    default:
      break;
  }

}