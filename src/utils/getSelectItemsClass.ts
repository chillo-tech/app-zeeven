const getSelectItemsClass = (value: number) => {
  switch (value) {
    case 0:
      return {
        normal: 'border border-blue-500 hover:bg-blue-200 hover:text-black',
        selected: 'bg-blue-500 text-white hover:!bg-blue-500 hover:!text-white',
      };
    case 1:
      return {
        normal: 'border border-blue-500 hover:bg-blue-200 hover:text-black',
        selected: 'bg-blue-500 text-white hover:!bg-blue-500 hover:!text-white',
      };
    case 2:
      return {
        normal: 'border border-blue-500 hover:bg-blue-200 hover:text-black',
        selected: 'bg-blue-500 text-white hover:!bg-blue-500 hover:!text-white',
      };
    case 3:
      return {
        normal: 'border border-blue-500 hover:bg-blue-200 hover:text-black',
        selected: 'bg-blue-500 text-white hover:!bg-blue-500 hover:!text-white',
      };
    default:
      return { normal: '', selected: '' };
  }
};

export default getSelectItemsClass;
