export const numberFormat = (x?: number, delimiter?: string) => {
  if (!delimiter) {
    delimiter = "";
  } 

  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter) : 0;
};

export const formatSignedNumber = (num: number): string => {
  return num >= 0 ? `+${num}` : `${num}`;
}

export const formatWithOriginalDecimals = (num: number | string) => {
    const numStr = String(num);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        signDisplay: 'exceptZero',
    }).format(Number(num));
};