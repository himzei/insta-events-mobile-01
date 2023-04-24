export const numberFormat = (number) => {
  let strNumber = number.toString();
  return strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const removeWhitespace = (arr) => {
  return arr.map((element) => element.replace(/\s+/g, ""));
};

export const addHashToElements = (arr) => {
  return arr.map((element) => "#" + element);
};
