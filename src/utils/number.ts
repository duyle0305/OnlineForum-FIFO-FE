export const numberFormat = (x?: number, delimiter?: string) => {
  if (!delimiter) {
    delimiter = "";
  } 

  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter) : 0;
};

export const formatSignedNumber = (num: number): string => {
  return num >= 0 ? `+${num}` : `${num}`;
}