export const numberFormat = (number) => {
  let strNumber = number.toString();
  return strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
